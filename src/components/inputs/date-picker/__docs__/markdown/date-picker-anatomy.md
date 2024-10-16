```vue
<template>
  <PeachyInput.Input>
    <PeachyInput.Label />

    <PeachyDatePicker.Input>
      <!-- #before or #after-->
      <template #after>
        <PeachyDialog.Dialog>
          <PeachyDialog.Trigger />

          <PeachyDialog.Target>
            <PeachyDialog.Title />

            <PeachyDatePicker.Calendar>
              <PeachyDatePicker.Title />

              <PeachyDatePicker.Table>
                <PeachyDatePicker.Description />

                <!-- Heading row -->
                <PeachyDatePicker.Head>
                  <PeachyDatePicker.Headings>
                    <PeachyDatePicker.Heading />
                  </PeachyDatePicker.Headings>
                </PeachyDatePicker.Head>

                <!-- Rows -->
                <PeachyDatePicker.Body>
                  <PeachyDatePicker.Week>
                    <PeachyDatePicker.WeekNumber />
                    <PeachyDatePicker.Day />
                  </PeachyDatePicker.Week>
                </PeachyDatePicker.Body>
              </PeachyDatePicker.Table>
            </PeachyDatePicker.Calendar>
          </PeachyDialog.Target>
        </PeachyDialog.Dialog>
      </template>
    </PeachyDatePicker.Input>
  </PeachyInput.Input>
</template>

<script lang="ts" setup>
  import { PeachyInput, PeachyDatePicker, PeachyDialog } from "typeach";
</script>
```
