

export function getNameOfPart(part){
    switch (part) {
        case "frontFenderLeft": return "Левое переднее крыло";
        case "frontFenderRight": return "Правое переднее крыло";
        case "quarterPanelLeft": return "Левая задняя часть";
        case "quarterPanelRight": return "Правая задняя часть";
        case "trunkLead": return "Крышка багажника";
        case "frontDoorLeft": return "Левая передняя дверь";
        case "frontDoorRight": return "Правая передняя дверь";
        case "rearDoorLeft": return "Левая задняя дверь";
        case "rearDoorRight": return "Правая задняя дверь";
        case "radiatorSupport": return "Радиаторная решетка";
        case "hood": return "Капот";
        case "dashPanel": return "Панель приборов";
        case "sideSillPanelLeft": return "Левая боковая панель";
        case "sideSillPanelRight": return "Правая боковая панель";
        //----------------------
        case "roofPanel": return "Крыша";
        case "frontPanel": return "Передняя панель";
        case "crossMember": return "Передняя балка";
        case "insidePanelLeft": return "Левая внутренняя панель";
        case "insidePanelRight": return "Правая внутренняя панель";
        case "rearPanel": return "Задняя панель";
        case "trunkFloor": return "Дно багажника";
        case "frontSideMemberLeft": return "Левая передняя балка";
        case "frontSideMemberRight": return "Правая передняя балка";
        case "rearSideMemberLeft": return "Левая задняя балка";
        case "rearSideMemberRight": return "Правая задняя балка";
        case "frontWheelHouseLeft": return "Левая передняя арка";
        case "frontWheelHouseRight": return "Правая передняя арка";
        case "rearWheelHouseLeft": return "Левая задняя арка";
        case "rearWheelHouseRight": return "Правая задняя арка";
        case "pillarPanelFrontLeft": return "Левая передняя стойка";
        case "pillarPanelMiddleLeft": return "Левая средняя стойка";
        case "pillarPanelRearLeft": return "Левая задняя стойка";
        case "pillarPanelFrontRight": return "Правая передняя стойка";
        case "pillarPanelMiddleRight": return "Правая средняя стойка";
        case "pillarPanelRearRight": return "Правая задняя стойка";
        case "packageTray": return "Полка багажника";
        case "floorPanel": return "Дно";
    }
    return "";
}

export function getTypeName(type){
    switch (type) {
        case "CHANGE": return "Замена";
        case "METAL": return "Ремонт";
        case "CORROSION": return "Коррозия";
        case "SCRATCH": return "Царапины";
        case "HILLS": return "Нарушения";
        case "DAMAGE": return "Повреждения";
        case "replace": return "Замена";
        case "repair": return "Ремонт";
        case "corrosion": return "Коррозия";
        case "scratches": return "Царапины";
        case "defection": return "Нарушения";
        case "damage": return "Повреждения";
    }
}