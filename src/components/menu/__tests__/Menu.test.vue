<template>
  <PeachyMenu.Menu>
    <PeachyMenu.Trigger id="menu-trigger">Menu</PeachyMenu.Trigger>

    <PeachyMenu.Target id="menu">
      <PeachyMenu.List>
        <PeachyMenu.Item @click="click('Menu item')">Menu item</PeachyMenu.Item>

        <PeachyMenu.Menu>
          <PeachyMenu.Trigger id="submenu-trigger">Submenu</PeachyMenu.Trigger>

          <PeachyMenu.Target id="submenu" placement="right">
            <PeachyMenu.List>
              <PeachyMenu.Item @click="click('Submenu item')">
                Submenu item
              </PeachyMenu.Item>

              <PeachyMenu.Item disabled @click="click('Submenu item')">
                Disabled submenu item
              </PeachyMenu.Item>

              <PeachyMenu.Menu>
                <PeachyMenu.Trigger id="nested-submenu-trigger">
                  Nested submenu
                </PeachyMenu.Trigger>

                <PeachyMenu.Target id="nested-submenu" placement="right">
                  <PeachyMenu.List>
                    <PeachyMenu.Item @click="click('Nested submenu item')">
                      Nested submenu item
                    </PeachyMenu.Item>

                    <PeachyMenu.CheckboxItem v-model:checked="checked">
                      Checkbox
                    </PeachyMenu.CheckboxItem>

                    <PeachyMenu.RadioGroup v-model:value="radioValue">
                      <PeachyMenu.RadioItem value="value">
                        Radio
                      </PeachyMenu.RadioItem>
                    </PeachyMenu.RadioGroup>
                  </PeachyMenu.List>
                </PeachyMenu.Target>
              </PeachyMenu.Menu>

              <PeachyMenu.Menu>
                <PeachyMenu.Trigger id="second-nested-submenu-trigger">
                  Second nested submenu
                </PeachyMenu.Trigger>

                <PeachyMenu.Target id="second-nested-submenu" placement="right">
                  <PeachyMenu.List>
                    <PeachyMenu.Item
                      @click="click('Second nested submenu item')">
                      Second nested submenu item
                    </PeachyMenu.Item>
                  </PeachyMenu.List>
                </PeachyMenu.Target>
              </PeachyMenu.Menu>
            </PeachyMenu.List>
          </PeachyMenu.Target>
        </PeachyMenu.Menu>
      </PeachyMenu.List>
    </PeachyMenu.Target>
  </PeachyMenu.Menu>
</template>

<script lang="ts" setup>
  import { ref, watch } from "vue";
  import { PeachyMenu } from "../";

  const emit = defineEmits<{
    click: [item: string];
    checked: [checked: boolean];
    radioValue: [value?: string];
  }>();

  const checked = ref(false);

  const radioValue = ref<string | undefined>(undefined);

  const click = (item: string) => emit("click", item);

  watch(checked, newChecked => {
    emit("checked", newChecked);
  });

  watch(radioValue, newRadioValue => {
    emit("radioValue", newRadioValue);
  });
</script>

<style scoped>
  *:focus {
    background-color: red;
  }

  .peachy-menu__item,
  .peachy-menu__sub-trigger {
    padding: 0.5rem;
  }
</style>
