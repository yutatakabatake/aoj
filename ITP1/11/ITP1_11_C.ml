type dice = {
  face1 : int;
  face2 : int;
  face3 : int;
  face4 : int;
  face5 : int;
  face6 : int;
}

let init_dice nums =
  let numbers = nums |> String.split_on_char ' ' |> List.map int_of_string in
  {
    face1 = List.nth numbers 0;
    face2 = List.nth numbers 1;
    face3 = List.nth numbers 2;
    face4 = List.nth numbers 3;
    face5 = List.nth numbers 4;
    face6 = List.nth numbers 5;
  }

let pp_dice { face1; face2; face3; face4; face5; face6 } =
  print_endline
    ("face1= " ^ string_of_int face1 ^ "\nface2= " ^ string_of_int face2
   ^ "\nface3= " ^ string_of_int face3 ^ "\nface4= " ^ string_of_int face4
   ^ "\nface5= " ^ string_of_int face5 ^ "\nface6= " ^ string_of_int face6)

let roll dice direction =
  match direction with
  | 'N' ->
      {
        face1 = dice.face2;
        face2 = dice.face6;
        face3 = dice.face3;
        face4 = dice.face4;
        face5 = dice.face1;
        face6 = dice.face5;
      }
  | 'E' ->
      {
        face1 = dice.face4;
        face2 = dice.face2;
        face3 = dice.face1;
        face4 = dice.face6;
        face5 = dice.face5;
        face6 = dice.face3;
      }
  | 'S' ->
      {
        face1 = dice.face5;
        face2 = dice.face1;
        face3 = dice.face3;
        face4 = dice.face4;
        face5 = dice.face6;
        face6 = dice.face2;
      }
  | 'W' ->
      {
        face1 = dice.face3;
        face2 = dice.face2;
        face3 = dice.face6;
        face4 = dice.face1;
        face5 = dice.face5;
        face6 = dice.face4;
      }
  | _ -> dice

let rec turn_right dice =
  {
    face1 = dice.face1;
    face2 = dice.face3;
    face3 = dice.face5;
    face4 = dice.face2;
    face5 = dice.face4;
    face6 = dice.face6;
  }

let eq dice1 dice2 =
  dice1.face1 == dice2.face1 && dice1.face2 == dice2.face2
  && dice1.face3 == dice2.face3 && dice1.face4 == dice2.face4
  && dice1.face5 == dice2.face5 && dice1.face6 == dice2.face6

let rec judge_side dice1 dice2 n =
  if n == 0 then false
  else if eq dice1 dice2 then true
  else
    let new_dice = turn_right dice1 in
    judge_side new_dice dice2 (n - 1)

let rec judge_top dice1 dice2 n =
  match n with
  | 1 ->
      let new_dice = roll dice1 'E' in
      let res = judge_side new_dice dice2 4 in
      if res then res else judge_top dice1 dice2 (n - 1)
  | 2 ->
      let new_dice = roll dice1 'W' in
      let res = judge_side new_dice dice2 4 in
      if res then res else judge_top dice1 dice2 (n - 1)
  | 3 ->
      let new_dice = roll (roll (roll dice1 'N') 'N') 'N' in
      let res = judge_side new_dice dice2 4 in
      if res then res else judge_top dice1 dice2 (n - 1)
  | 4 ->
      let new_dice = roll (roll dice1 'N') 'N' in
      let res = judge_side new_dice dice2 4 in
      if res then res else judge_top dice1 dice2 (n - 1)
  | 5 ->
      let new_dice = roll dice1 'N' in
      let res = judge_side new_dice dice2 4 in
      if res then res else judge_top dice1 dice2 (n - 1)
  | 6 ->
      let res = judge_side dice1 dice2 4 in
      if res then res else judge_top dice1 dice2 (n - 1)
  | _ -> false

let judge_same_dice dice1 dice2 = judge_top dice1 dice2 6

let main () =
  let input_num1 = read_line () in
  let input_num2 = read_line () in
  let dice1 = init_dice input_num1 in
  let dice2 = init_dice input_num2 in
  let res = judge_same_dice dice1 dice2 in
  if res then print_endline "Yes" else print_endline "No"

let _ = main ()
