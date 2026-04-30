(* トップ
北に4回転がしてトップの面があるかみる
  あるならfrontを探す
  ないなら左右を見て右にあるならE，左にあるならWに転がす

フロント
トップとボトムを固定して右回しの関数を定義する
4回回して見つける *)

type dice = {
  face1 : int;
  face2 : int;
  face3 : int;
  face4 : int;
  face5 : int;
  face6 : int;
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

let rec turn_right dice n =
  if n == 0 then dice
  else
    let new_dice =
      {
        face1 = dice.face1;
        face2 = dice.face3;
        face3 = dice.face5;
        face4 = dice.face2;
        face5 = dice.face4;
        face6 = dice.face6;
      }
    in
    turn_right new_dice (n - 1)

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

let find_top top dice =
  match dice with
  | { face1; _ } when face1 == top -> dice
  | { face1; face2; _ } when face2 == top -> roll dice 'N'
  | { face1; face2; face3; _ } when face3 == top -> roll dice 'W'
  | { face1; face2; face3; face4; _ } when face4 == top -> roll dice 'E'
  | { face1; face2; face3; face4; face5; _ } when face5 == top -> roll dice 'S'
  | { face1; face2; face3; face4; face5; face6 } when face6 == top ->
      roll (roll dice 'N') 'N'
  | _ -> dice

let find_front front dice =
  match dice with
  | { face1; face2; _ } when face2 == front -> dice
  | { face1; face2; face3; _ } when face3 == front -> turn_right dice 1
  | { face1; face2; face3; face4; _ } when face4 == front -> turn_right dice 3
  | { face1; face2; face3; face4; face5; _ } when face5 == front ->
      turn_right dice 2
  | _ -> dice

let find_right nums dice =
  let num_lst = nums |> String.split_on_char ' ' |> List.map int_of_string in
  let top = List.nth num_lst 0 in
  let front = List.nth num_lst 1 in
  let top_dice = find_top top dice in
  let front_dice = find_front front top_dice in
  print_endline (string_of_int front_dice.face3)

let rec loop n dice =
  if n == 0 then ()
  else
    let nums = read_line () in
    let _ = find_right nums dice in
    loop (n - 1) dice

let main () =
  let input_face_nums = read_line () in
  let loop_num = read_int () in
  let dice = init_dice input_face_nums in
  loop loop_num dice

let _ = main ()
