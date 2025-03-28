import {IPipelineItem} from "@components/features/StartService/items/PipelineItem/PipelineItemTypes.ts";
import { ReactComponent as ProjectionScreen } from "@icons/named_exported/start-service/projection_screen.svg";
import { ReactComponent as AddPerson } from "@icons/named_exported/start-service/add_person.svg";
import { ReactComponent as Libra } from "@icons/named_exported/start-service/libra.svg";
import { ReactComponent as Table } from "@icons/named_exported/start-service/table.svg";
import { ReactComponent as MoneyBag } from "@icons/named_exported/start-service/money-bag.svg";
import React from "react";

export const PIPELINES: IPipelineItem[] = [
    {   title: 'Przygotowanie do sprzedaży',
        subtitle: 'Krótki opis poziomu usługi lorem ipsum dolor sit amet, consectetur adipiscing elit',
        destiny: 'Stworzenie fundamentów sprzedaży poprzez opracowanie strategii wejścia na rynek, identyfikację kluczowych rynków docelowych oraz ustalenie spójnych procesów, które pozwolą na skuteczne docieranie do klientów.',
        icon: React.createElement(ProjectionScreen)
    },
    {   title: 'Wsparcie IT dla sprzedaży',
        subtitle: 'Krótki opis poziomu usługi lorem ipsum dolor sit amet, consectetur adipiscing elit',
        destiny: 'Stworzenie fundamentów sprzedaży poprzez opracowanie strategii wejścia na rynek, identyfikację kluczowych rynków docelowych oraz ustalenie spójnych procesów, które pozwolą na skuteczne docieranie do klientów.',
        icon:  React.createElement(Table)
    },
    {   title: 'Wsparcie sprzedaży: generowanie leadów i zainteresowania',
        subtitle: 'Krótki opis poziomu usługi lorem ipsum dolor sit amet, consectetur adipiscing elit',
        destiny: 'Stworzenie fundamentów sprzedaży poprzez opracowanie strategii wejścia na rynek, identyfikację kluczowych rynków docelowych oraz ustalenie spójnych procesów, które pozwolą na skuteczne docieranie do klientów.',
        icon: React.createElement(AddPerson)
    },
    {   title: 'Podgrzewanie i kwalifikacja leadów',
        subtitle: 'Krótki opis poziomu usługi lorem ipsum dolor sit amet, consectetur adipiscing elit',
        destiny: 'Stworzenie fundamentów sprzedaży poprzez opracowanie strategii wejścia na rynek, identyfikację kluczowych rynków docelowych oraz ustalenie spójnych procesów, które pozwolą na skuteczne docieranie do klientów.',
        icon:  React.createElement(Libra)
    },
    {   title: 'Prowadzenie procesu sprzedaży',
        subtitle: 'Krótki opis poziomu usługi lorem ipsum dolor sit amet, consectetur adipiscing elit',
        destiny: 'Stworzenie fundamentów sprzedaży poprzez opracowanie strategii wejścia na rynek, identyfikację kluczowych rynków docelowych oraz ustalenie spójnych procesów, które pozwolą na skuteczne docieranie do klientów.',
        icon:  React.createElement(MoneyBag)
    },
] as const;