let main () =
  let n = read_int () in
  let nums =
    read_line () |> String.split_on_char ' ' |> List.map int_of_string
    |> Array.of_list
  in
  sort n nums

let _ = main ()
