<!-- #region snippet -->
<template>
  <PeachyInput.Group class="indeterminate-checkbox-wrapper">
    <PeachyInput.GroupLabel>Indeterminate checkboxes</PeachyInput.GroupLabel>

    <PeachyInput.Input class="checkbox">
      <PeachyCheckbox.Input>
        <template #after>
          <PeachyCheckbox.Indicator>
            <template #indeterminate>-</template>

            <CheckboxSvg />
          </PeachyCheckbox.Indicator>

          <PeachyInput.Label>All checkboxes</PeachyInput.Label>

          <div class="checkbox-children-wrapper">
            <PeachyInput.Input class="checkbox">
              <PeachyCheckbox.Input @v-model:state="checkboxOne">
                <template #after>
                  <PeachyCheckbox.Indicator>
                    <CheckboxSvg />
                  </PeachyCheckbox.Indicator>

                  <PeachyInput.Label>Checkbox 1</PeachyInput.Label>
                </template>
              </PeachyCheckbox.Input>
            </PeachyInput.Input>

            <PeachyInput.Input class="checkbox">
              <PeachyCheckbox.Input @v-model:state="checkboxTwo">
                <template #after>
                  <PeachyCheckbox.Indicator>
                    <CheckboxSvg />
                  </PeachyCheckbox.Indicator>

                  <PeachyInput.Label>Checkbox 2</PeachyInput.Label>
                </template>
              </PeachyCheckbox.Input>
            </PeachyInput.Input>
          </div>
        </template>
      </PeachyCheckbox.Input>
    </PeachyInput.Input>
  </PeachyInput.Group>
</template>
<!-- #endregion snippet -->

<script lang="ts" setup>
  import { ref } from "vue";

  import { PeachyCheckbox, PeachyInput } from "@/index";

  import type { CheckboxState } from "@/components/inputs/checkbox/context";

  import CheckboxSvg from "./CheckboxSvg.vue";

  const checkboxOne = ref<CheckboxState>(false);

  const checkboxTwo = ref<CheckboxState>(false);
</script>
