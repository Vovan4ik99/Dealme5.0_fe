import { ReactComponent as ProjectionScreen } from "@icons/named_exported/start-service/projection_screen.svg";
import { ReactComponent as AddPerson } from "@icons/named_exported/start-service/add_person.svg";
import { ReactComponent as Libra } from "@icons/named_exported/start-service/libra.svg";
import { ReactComponent as Table } from "@icons/named_exported/start-service/table.svg";
import { ReactComponent as MoneyBag } from "@icons/named_exported/start-service/money-bag.svg";
import React, {ReactNode} from "react";

export const PIPELINES_ICON: ReactNode[] = [
        React.createElement(ProjectionScreen),
        React.createElement(Table),
        React.createElement(AddPerson),
        React.createElement(Libra),
        React.createElement(MoneyBag)
] as const;