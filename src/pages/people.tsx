import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getPublicUrl } from "../utils";

import { BaseLayout } from "../components/layout";
import Button from "../components/Button";

interface PersonVO {
  readonly id: number;
  readonly name: string;
  readonly popularity: number;
  readonly keyword: string;
  readonly imageUrl: string;
  readonly story: string;
  readonly isActive: boolean;
}

const People = (): JSX.Element => {
  const navigate = useNavigate();

  const [people, setPeople] = useState<PersonVO[]>([]);

  useEffect(() => {
    fetch('people.json')
      .then((res) => res.json())
      .then((data) => {
        setPeople(data);
      });
  }, []);

  const handleClick = useCallback((personId: number) => {
    sessionStorage.setItem('personId', String(personId));
    navigate('/upload');
  }, [navigate]);

  return (
    <BaseLayout
      titleName="인물을 골라주세요"
    >
      <div className="w-4/5 md:w-[640px] xl:w-[1024px] h-full">
        <ul className="w-full h-4/5 grid grid-cols-3 sm:grid-cols-4 xl:grid-cols-8 overflow-auto mt-12">
          {
            people.map((person, index) => (
              <Button
                className=""
                key={index}
                onClick={() => handleClick(person.id)}
              >
                <li className="flex items-center h-full bg-gray-200 border">
                  <img src={getPublicUrl(person.imageUrl)} alt={person.name} className="w-full h-full"/>
                  <div className="hidden w-full h-full bg-gray-300"></div>
                </li>
              </Button>
            ))
          }
        </ul>
      </div>
    </BaseLayout>
  );
}

export default People;