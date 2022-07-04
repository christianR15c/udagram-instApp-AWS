// import express from 'express';
import bodyParser from 'body-parser';
import { filterImageFromURL, deleteLocalFiles } from './util/util';
import express, { Router, Request, Response } from 'express';

(async () => {
  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;

  app.use(bodyParser.json());

  app.get('/filter-image', async (req: Request, res: Response) => {
    let url: string = req.query.image_url;
    if (url === '') {
      return res.status(400).send('Image not found');
    }

    filterImageFromURL(url)
      .then((filtered) => {
        if (!filtered) res.status(400).send('Image not found');
        res.status(200).sendFile(filtered, () => deleteLocalFiles([filtered]));
      })
      .catch((error) => {
        res.status(400).send(error);
        console.log(error);
      });
  });

  /**************************************************************************** */

  //! END @TODO1
  // Root Endpoint
  // Displays a simple message to the user
  app.get('/', async (req, res) => {
    res.send('try GET /filteredimage?image_url={{}}');
  });

  // Start the Server
  app.listen(port, () => {
    console.log(`server running http://localhost:${port}`);
    console.log(`press CTRL+C to stop server`);
  });
})();
