import { TabsProps } from "antd";

import { CasesTableFilterBy } from "../tab/enum";

export const CasesFilterByItems: TabsProps["items"] = [
  {
    key: CasesTableFilterBy.All,
    label: CasesTableFilterBy.All,
  },
  {
    key: CasesTableFilterBy.Active,
    label: CasesTableFilterBy.Active,
  },
  {
    key: CasesTableFilterBy.Inactive,
    label: CasesTableFilterBy.Inactive,
  },
  {
    key: CasesTableFilterBy.Draft,
    label: CasesTableFilterBy.Draft,
  },
];
export const CasesFilterByItemsWithoutDraft: TabsProps["items"] = [
  {
    key: CasesTableFilterBy.All,
    label: CasesTableFilterBy.All,
  },
  {
    key: CasesTableFilterBy.Active,
    label: CasesTableFilterBy.Active,
  },
  {
    key: CasesTableFilterBy.Inactive,
    label: CasesTableFilterBy.Inactive,
  },
];
