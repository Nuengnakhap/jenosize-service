import Env from "@configs/env";
import { IReq } from "@declarations/types";
import validators from "@validators";
import axios from "axios";
import { Response, Router } from "express";

const router = Router();

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
    .then(({ data }) => res.send(data))
    .catch((err) => {
      if (axios.isAxiosError(err)) {
        res.status(err.response?.status ?? 400).send(err.response?.data);
      } else {
        res.status(400).send(err.message);
      }
    });
}
