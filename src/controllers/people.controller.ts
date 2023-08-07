import { useEffect, useState, useContext } from "react";
import { useRecoilState } from "recoil";

import { DataController } from "./types";
import { PersonResponseState, PersonVO } from "../data/person/person.vo";
import { RouterContext } from "../utils/router.util";

export const usePeople = (): DataController<undefined, PersonVO> => {
  const [items, setItems] = useState<PersonVO[]>([]);
  const [responseState, setResponseState] = useRecoilState(PersonResponseState);

  const router = useContext(RouterContext);

  useEffect(() => {
    if (router.current === 'people') {
      fetch('people.json')
        .then((res) => res.json())
        .then((data: PersonVO[]) => {
          setItems(data);
          setResponseState({
            loading: false,
            fetched: false
          })
        });
    }
  }, [router]);

  async function add() {};
  async function modify() {};
  async function remove() {};

  return {
    items,
    dataState: responseState,
    add,
    modify,
    remove
  }
}
