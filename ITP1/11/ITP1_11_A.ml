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

let rec loop str dice =
  match str with
  | "" -> dice
  | _ ->
      let new_dice = roll dice str.[0] in
      loop (String.sub str 1 (String.length str - 1)) new_dice

and roll dice direction =
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

let main () =
  let input_nums = read_line () in

  let input_roll = read_line () in

  let dice = init_dice input_nums in
  let rolled_dice = loop input_roll dice in
  print_endline (string_of_int rolled_dice.face1)

let _ = main ()
