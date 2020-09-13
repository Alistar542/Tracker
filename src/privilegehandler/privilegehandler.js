import { AbilityBuilder } from "@casl/ability";
import { createContext } from "react";
import { defineAbility } from "@casl/ability";
import { USER_TYPE } from "../constants";

export const AbilityContext = createContext();

export function updatePrivilege(ability, user) {
  const { can, cannot, rules } = new AbilityBuilder();

  if (user.userType === USER_TYPE.ADMINISTRATOR) {
    can("manage", "all");
    //can("view", "travelled");
  } else {
    can("read", "all");
    cannot("view", "enrolled");
    cannot("view", "settings");
  }

  ability.update(rules);
}

export const ability = defineAbility((can, cannot) => {
  cannot("manage", "all");
  cannot("read", "all");
  cannot("view", "enrolled");
  cannot("view", "settings");
});
