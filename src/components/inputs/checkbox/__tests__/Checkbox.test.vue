<template>
  <PeachyInput.Group>
    <PeachyInput.GroupLabel>Fruits</PeachyInput.GroupLabel>

    <PeachyInput.Input>
      <PeachyCheckbox.Input id="all">
        <template #after>
          <PeachyInput.Label>All fruit</PeachyInput.Label>

          <PeachyInput.Input>
            <PeachyCheckbox.Input id="pears">
              <template #after>
                <PeachyInput.Label>Pears</PeachyInput.Label>
              </template>
            </PeachyCheckbox.Input>
          </PeachyInput.Input>

          <PeachyInput.Input>
            <PeachyCheckbox.Input id="apples">
              <template #after>
                <PeachyInput.Label>Apples</PeachyInput.Label>
              </template>
            </PeachyCheckbox.Input>
          </PeachyInput.Input>

          <PeachyInput.Group>
            <PeachyInput.GroupLabel>Juicy fruits</PeachyInput.GroupLabel>

            <PeachyInput.Input>
              <PeachyCheckbox.Input id="juicy">
                <template #after>
                  <PeachyInput.Label>All juicy fruits</PeachyInput.Label>

                  <PeachyInput.Input>
                    <PeachyCheckbox.Input id="lemons">
                      <template #after>
                        <PeachyInput.Label>Lemons</PeachyInput.Label>
                      </template>
                    </PeachyCheckbox.Input>
                  </PeachyInput.Input>

                  <PeachyInput.Group>
                    <PeachyInput.GroupLabel>Citrus</PeachyInput.GroupLabel>

                    <PeachyInput.Input>
                      <PeachyCheckbox.Input id="citrus">
                        <template #after>
                          <PeachyInput.Label>Citrus</PeachyInput.Label>

                          <PeachyInput.Input>
                            <PeachyCheckbox.Input id="clementines">
                              <template #after>
                                <PeachyInput.Label>
                                  Clementine
                                </PeachyInput.Label>
                              </template>
                            </PeachyCheckbox.Input>
                          </PeachyInput.Input>

                          <PeachyInput.Input>
                            <PeachyCheckbox.Input id="oranges">
                              <template #after>
                                <PeachyInput.Label>Oranges</PeachyInput.Label>
                              </template>
                            </PeachyCheckbox.Input>
                          </PeachyInput.Input>
                        </template>
                      </PeachyCheckbox.Input>
                    </PeachyInput.Input>
                  </PeachyInput.Group>
                </template>
              </PeachyCheckbox.Input>
            </PeachyInput.Input>
          </PeachyInput.Group>
        </template>
      </PeachyCheckbox.Input>
    </PeachyInput.Input>
  </PeachyInput.Group>
</template>

<script lang="ts" setup>
  import { PeachyCheckbox } from "../";
  import { PeachyInput } from "../../input";
</script>

<style>
  .peachy-checkbox__input {
    /**
    * To make the test easier to visually
    * follow, we revert it's style to
    * the native appearance.
    */
    appearance: auto !important;
  }
</style>
