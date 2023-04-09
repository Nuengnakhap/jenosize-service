import Env from "@configs/env";
import { IReq } from "@declarations/types";
import validators from "@validators";
import axios from "axios";
import { Response, Router } from "express";

const router = Router();

router.get("/restaurant/photo", getRestaurantPhoto);

// POST METHOD //
router.post("/restaurant", validators.search.restaurant, searchRestaurant);

export default router;

async function searchRestaurant(req: IReq<{ query: string }>, res: Response) {
  const { query } = req.body;

  axios
    .get("https://maps.googleapis.com/maps/api/place/textsearch/json", {
      params: {
        key: Env.G_API_KEY,
        type: "restaurant",
        query,
      },
    })
    .then(({ data }) => res.send(data.results ?? []))
    .catch((err) => {
      if (axios.isAxiosError(err)) {
        res.status(err.response?.status ?? 400).send(err.response?.data);
      } else {
        res.status(400).send(err.message);
      }
    });
}

function getRestaurantPhoto(req: IReq, res: Response) {
  const { photo_reference } = req.query;

  if (!photo_reference) {
    return res.status(400).send("photo_reference is required!");
  }

  const params = {
    photo_reference,
    key: Env.G_API_KEY,
    maxwidth: 400,
  };

  // Make an HTTP GET request to the Place Photo API endpoint
  axios
    .get("https://maps.googleapis.com/maps/api/place/photo", {
      params,
      responseType: "arraybuffer",
    })
    .then((response) => {
      res.contentType("image/jpeg");
      res.send(response.data);
    })
    .catch((error) => {
      res.status(500).send("Error fetching image from API");
    });
}
