import React, { useState } from 'react';
import axios from 'axios';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { CircularProgress, Typography, AppBar, Toolbar, Avatar, Container, Grid, Card, CardMedia, CardContent, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Button } from '@material-ui/core';
import { DropzoneArea } from 'material-ui-dropzone';
import ClearIcon from '@material-ui/icons/Clear';
import cblogo from './cblogo.PNG';
import image from './bg.png';
import Header from './Header_api';
import Footer from './Footer';

const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(theme.palette.common.white),
    backgroundColor: theme.palette.common.white,
    '&:hover': {
      backgroundColor: '#ffffff7a',
    },
  },
}))(Button);

const useStyles = makeStyles((theme) => ({
  // Your styles
}));

const Use_api = () => {
  const classes = useStyles();
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [predictions, setPredictions] = useState(null);
  const [error, setError] = useState('');

  const handleFileChange = (file) => {
    if (!(file instanceof Blob)) {
      console.error('Expected file to be a Blob, received:', file);
      return;
    }
  
    setSelectedFile(file);
  
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      setUploading(true);
      const response = await axios.post('http://localhost:8000/predict', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setPredictions(response.data.predictions);
    } catch (error) {
      setError('Error uploading image: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  const clearData = () => {
    setPredictions(null);
    setSelectedFile(null);
    setPreview(null);
    setError('');
  };
  return (
    <React.Fragment>
      <Header/>
      <AppBar position="static" className={classes.appbar}>
        <Toolbar>
          <Typography variant="h2" className={classes.grow}>
             Classification des oiseaux Marins
          </Typography>
          { /*<Avatar src={cblogo} />*/}
        </Toolbar>
      </AppBar>
      <Container maxWidth={false} className={classes.mainContainer} disableGutters>
        <Grid container className={classes.gridContainer}>
          <Grid item xs={12}>
            <Card className={`${classes.imageCard} ${!preview ? classes.imageCardEmpty : ''}`}>
              <CardContent> {/* Ensure CardContent is correctly used */}
                <DropzoneArea
                  acceptedFiles={['image/*']}
                  dropzoneText="Charger une image d'un oiseau à traiter pour l'identifier"
                  onChange={(files) => handleFileChange(files[0])}
                />
                {preview && <CardMedia className={classes.media} image={preview} />}
              </CardContent>
              <CardContent className={classes.uploadButtonContainer}> {/* New section for upload button */}
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  disabled={!selectedFile || uploading}
                  onClick={handleSubmit}
                >
                  {uploading ? 'Uploading...' : 'Envoyer L\'image'}
                </Button>
              </CardContent>
              {uploading && (
                <CardContent className={classes.detail}> {/* Ensure CardContent is correctly used */}
                  <CircularProgress color="secondary" className={classes.loader} />
                  <Typography variant="h6" className={classes.text}>
                    Processing
                  </Typography>
                </CardContent>
              )}
              {predictions && (
                <CardContent className={classes.detail}> {/* Ensure CardContent is correctly used */}
                  <TableContainer component={Card}>
                    <Table className={classes.table} size="small" aria-label="simple table">
                      <TableHead className={classes.tableHead}>
                        <TableRow className={classes.tableRow}>
                          <TableCell className={classes.tableCell1}>Label:</TableCell>
                          <TableCell align="right" className={classes.tableCell1}>Confidence:</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody className={classes.tableBody}>
                        {predictions.map((prediction, index) => (
                          <TableRow key={index} className={classes.tableRow}>
                            <TableCell component="th" scope="row" className={classes.tableCell}>
                              {prediction.class}
                            </TableCell>
                            <TableCell align="right" className={classes.tableCell}>
                              {(prediction.confidence * 100).toFixed(2)}%
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <ColorButton variant="contained" className={classes.clearButton} color="primary" size="large" onClick={clearData} startIcon={<ClearIcon />}>
                    Clear
                  </ColorButton>
                </CardContent>
              )}
              {error && (
                <CardContent> {/* Ensure CardContent is correctly used */}
                  <Typography style={{ color: 'red' }}>{error}</Typography>
                </CardContent>
              )}
            </Card>
          </Grid>
        </Grid>
      </Container>
      <Footer/>
    </React.Fragment>
  );

};

export default Use_api;
