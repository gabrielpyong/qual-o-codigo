import { ChamberCode } from "@/types/product";

export interface Chamber {
  code: ChamberCode;
  side: "Direita" | "Esquerda";
  description: string;
}

export const chambers: Chamber[] = [
  { code: "D1", side: "Direita", description: "Retalhos, sebo e salsichas" },
  { code: "D2", side: "Direita", description: "Patinho, coxões e alcatra" },
  { code: "D3", side: "Direita", description: "Costelas, contrafilé e miúdos, carnes a vácuo" },
  { code: "D4", side: "Direita", description: "Paleta, peito e agulha" },
  { code: "E1", side: "Esquerda", description: "Produção, quebras" },
  { code: "E2", side: "Esquerda", description: "Carnes suínas, linguiças e calabresas" },
  { code: "E3", side: "Esquerda", description: "Porco" },
  { code: "E4", side: "Esquerda", description: "Pão de alho, Capeletti" },
  { code: "E5", side: "Esquerda", description: "Frango, pão de alho e capeletti" },
];
