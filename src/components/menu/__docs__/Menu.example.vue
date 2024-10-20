<template>
  <PeachyMenu.Menu>
    <PeachyMenu.Trigger>
      Menu
      <unicon name="ellipsis-h" />
    </PeachyMenu.Trigger>

    <PeachyMenu.Target>
      <PeachyMenu.List>
        <PeachyMenu.Item>Menu item</PeachyMenu.Item>

        <PeachyMenu.Menu>
          <PeachyMenu.Trigger>
            Submenu
            <unicon name="angle-right" />
          </PeachyMenu.Trigger>

          <PeachyMenu.Target placement="right-start">
            <PeachyMenu.List>
              <PeachyMenu.Item>Submenu item</PeachyMenu.Item>

              <PeachyMenu.Item disabled>Disabled submenu item</PeachyMenu.Item>

              <PeachyMenu.CheckboxItem v-model:checked="checked">
                <div class="checkbox" role="presentation" />
                Checkbox
              </PeachyMenu.CheckboxItem>
            </PeachyMenu.List>
          </PeachyMenu.Target>
        </PeachyMenu.Menu>

        <PeachyMenu.Separator />

        <PeachyMenu.RadioGroup v-model:value="radioValue">
          <PeachyMenu.Label>Label</PeachyMenu.Label>

          <PeachyMenu.RadioItem :value="0">
            <div class="radio" role="presentation" />
            Radio Option
          </PeachyMenu.RadioItem>

          <PeachyMenu.RadioItem :value="1">
            <div class="radio" role="presentation" />
            Radio option
          </PeachyMenu.RadioItem>
        </PeachyMenu.RadioGroup>
      </PeachyMenu.List>
    </PeachyMenu.Target>
  </PeachyMenu.Menu>
</template>

<script lang="ts" setup>
  import { ref } from "vue";

  import { PeachyMenu } from "typeach";

  const checked = ref(false);

  const radioValue = ref(0);
</script>

<style src="./menu.css" />
