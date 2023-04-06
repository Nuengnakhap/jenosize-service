import Env from "@configs/env";
import { IReq } from "@declarations/types";
import validators from "@validators";
import axios from "axios";
import { Response, Router } from "express";

const router = Router();

// POST METHOD //
router.post("/cal24", validators.game.cal24, cal24);

export default router;

function generatePermutations(nums: number[]) {
  if (nums[0] == nums[1] && nums[1] == nums[2] && nums[2] == nums[3]) {
    return [nums];
  }

  const result: number[][] = [];
  const used = new Array(nums.length).fill(false);
  const dfs = (path: number[]) => {
    if (path.length === nums.length) {
      result.push([...path]);
      return;
    }
    for (let i = 0; i < nums.length; i++) {
      if (!used[i]) {
        used[i] = true;
        path.push(nums[i]);
        dfs(path);
        path.pop();
        used[i] = false;
      }
    }
  };
  dfs([]);
  return result;
}

async function cal24(req: IReq<{ numbers: number[] }>, res: Response) {
  const { numbers } = req.body;

  const permutations = generatePermutations(numbers);
  const operations = ["+", "-", "*", "/"];

  for (let nums of permutations) {
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        for (let k = 0; k < 4; k++) {
          let expr = `(${nums[0]}${operations[i]}${nums[1]})${operations[j]}(${nums[2]}${operations[k]}${nums[3]})`;
          if (eval(expr) === 24) {
            return res.send("YES");
          }
        }
      }
    }
  }
  res.send("NO");
}
