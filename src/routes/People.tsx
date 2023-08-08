import { useContext, useMemo, useState } from "react";
import { useRecoilState } from "recoil";

import { RouterContext } from "../utils/router.util";
import { usePeople } from "../controllers/people.controller";
import { classNames, getPublicUrl } from "../utils";
import { ImageFileDtoState } from "../data/upload/upload.dto";

import Button from "../components/Button";
import {
  subTitleClassName,
  contentContainerClassName
} from "../styles/className";

const incluedPeople = [
  1, 2, 3, 4, 5, 6, 22, 23
];

export default function People() {
  const router = useContext(RouterContext);

  const {items} = usePeople();
  const [imageFileDto, setImageFileDto] = useRecoilState(ImageFileDtoState);

  const people = useMemo(() => items.filter((person) => incluedPeople.includes(person.id)), [items]);
  const [currentId, setCurrentId] = useState<number>(1);
  const targetPerson = useMemo(() => people.find(v => v.id === currentId), [currentId, people]);

  return (
    <div className={contentContainerClassName}>
      <div className="w-full flex justify-center">
        <h2 className={classNames(
          subTitleClassName,
          "my-4"
        )}>독립운동가를 골라주세요</h2>
      </div>
      <div>
        <div className="w-full flex flex-row justify-between items-center">
          <h3 className="text-lg sm:text-xl">{targetPerson?.name}</h3>
          <Button className="text-gb-purple underline"
            onClick={() => {
              setImageFileDto({
                ...imageFileDto,
                personId: targetPerson?.id ?? 0
              });
              router.push("upload");
            }}
          >
            선택하기
          </Button>
        </div>
        <div className="w-full h-[180px] lg:h-[132px] pt-4 sm:pt-8 mb-4 bg-stone-200 rounded-lg">
          <div className="text-sm sm:text-base font-pretendard px-2">
            {targetPerson?.story}
          </div>
        </div>
      </div>
      <ul className="w-full h-3/5 grid grid-cols-3 sm:grid-cols-4 xl:grid-cols-8 overflow-auto">
        {
          people.map((person, index) => (
            <Button
              key={index}
              onClick={() => {setCurrentId(person.id)}}
              className={classNames(
                currentId === person.id ?
                "border-4 border-blue-500" : ""
              )}
            >
              <li className="flex items-center h-full bg-gray-200 border">
                <img src={getPublicUrl(person.imageUrl)} alt={person.name} className="w-full h-full"/>
              </li>
            </Button>
          ))
        }
        <div className="h-[60px] sm:h-[80px]"></div>
      </ul>
    </div>
  );
}
