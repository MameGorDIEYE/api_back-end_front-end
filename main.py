import requests
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import numpy as np
from io import BytesIO
from PIL import Image
import tensorflow as tf

app = FastAPI()

# URL of the TensorFlow Serving model endpoint
endpoint_url = "http://localhost:8503/v1/models/bird_model:predict"

# List of class names corresponding to model output
CLASSES_NAMES = ['AUTOUR_SOMBRE', 'Aigle_botte', 'Aigle_pecheur', 'Aigrette_ardoisee',
                 'Aigrette_garzette', 'Aningha', 'Anserelle_naine', 'Avocette', 'Balbuzard',
                 'Barge_rousse', 'Becasseau_cocorli', 'Becasseau_maubeche',
                 'Becasseau_sanderling', 'Becasseau_variable', 'Bihoreau_gris',
                 'Busard_cendre', 'Canard_a_bosse', 'Chevalier_arlequin',
                 'Chevalier_combattant', 'Chevalier_guignette', 'Circaete_jean_le_blanc',
                 'Combatttant_varie', 'Cormoran_africain', 'Courlis_cendre',
                 'Courlis_courlieu', 'Dendrocygne_fauve', 'Dendrocygne_veuf',
                 'Echasse_blanche', 'Flamant_nain', 'Flamant_rose', 'Gallinule_poule_d_eau',
                 'Goeland_brun', 'Goeland_d_audoin', 'Goeland_railleur', 'Grand_gravelot',
                 'Grue_couronnee', 'Heron_cendre', 'aigrette_gorge_blanche',
                 'barge_a_queue_noire', 'canard_siffleur', 'chevalier_aboyeur',
                 'chevalier_gambette', 'cigogne_noire', 'grand_cormoran', 'grande_aigrette']

# Configure CORS
origins = [
    "http://localhost:3000",
    "http://localhost:8000",
    # Add other origins if needed
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/ping")
async def ping():
    return "Hello Mame GOR, I am alive"

def read_file_as_image(data) -> np.ndarray:
    # Use Pillow to open image from BytesIO and convert to numpy array
    image = np.array(Image.open(BytesIO(data)))
    return image

def preprocess(image, mean=0.5, std=0.5, shape=(224, 224)):
    """Scale, normalize and resizes images."""
    image = image / 255.0  # Scale
    image = (image - mean) / std  # Normalize
    image = tf.image.resize(image, shape)  # Resize
    return image

@app.post("/predict")
async def predict(
    file: UploadFile = File(...)
):
    try:
        # Read uploaded image file as numpy array
        image1 = read_file_as_image(await file.read())
        image = preprocess(image1, mean=0.5, std=0.5, shape=(224, 224))

        img_batch = np.expand_dims(image, 0)  # Add batch dimension

        json_data = {
            "instances": img_batch.tolist()  # Convert image data to nested list for JSON serialization
        }

        # Send POST request to TensorFlow Serving model endpoint
        response = requests.post(endpoint_url, json=json_data)
        response.raise_for_status()  # Raise an error for non-2xx responses

        # Extract predictions from response
        predictions = response.json()["predictions"]
        
        if predictions:
            # Get the top 5 prediction indices
            top_5_indices = np.argsort(predictions[0])[-5:][::-1]
            
            # Prepare response with top predictions
            response_data = []
            for class_index in top_5_indices:
                class_name = CLASSES_NAMES[class_index]
                confidence = predictions[0][class_index]
                
                response_data.append({
                    'class': class_name,
                    'confidence': float(confidence)
                })

            return {
                'predictions': response_data
            }
        else:
            return {
                'error': 'No predictions found in response'
            }
    except Exception as e:
        return {
            'error': str(e)
        }

if __name__ == "__main__":
    uvicorn.run(app, host='localhost', port=8000, debug=True)
