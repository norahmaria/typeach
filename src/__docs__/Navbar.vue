<template>
  <RouterLink
    :to="{ name: 'home' }"
    style="margin-right: auto; filter: grayscale(20%)"
    aria-label="Typeach">
    🍑
  </RouterLink>

  <PeachyMenu.Menu>
    <PeachyMenu.Trigger>General</PeachyMenu.Trigger>

    <PeachyMenu.Target>
      <PeachyMenu.List>
        <PeachyMenu.Item @click="router.push('styling')">
          Styling
        </PeachyMenu.Item>

        <PeachyMenu.Item @click="router.push('user-preferences')">
          User preferences
        </PeachyMenu.Item>

        <PeachyMenu.Item @click="router.push('user-guides')">
          User guides
        </PeachyMenu.Item>
      </PeachyMenu.List>
    </PeachyMenu.Target>
  </PeachyMenu.Menu>

  <PeachyMenu.Menu>
    <PeachyMenu.Trigger>
      <span
        ref="componentMenuTrigger"
        aria-keyshortcuts="Meta+K"
        aria-label="Components">
        <span style="margin-right: 0.5em">Components</span>

        <span class="components-keyboard-shortcut">
          <kbd v-if="isMac">⌘</kbd>
          <kbd v-else>CTRL</kbd>
          +
          <kbd>K</kbd>
        </span>
      </span>
    </PeachyMenu.Trigger>

    <PeachyMenu.Target>
      <PeachyMenu.List>
        <PeachyMenu.Item
          v-for="link in links"
          :key="link.key"
          @click="router.push(link.to)">
          {{ link.title }}
        </PeachyMenu.Item>

        <PeachyMenu.Menu>
          <PeachyMenu.Trigger>
            Inputs
            <unicon name="angle-right" />
          </PeachyMenu.Trigger>

          <PeachyMenu.Target placement="right-start">
            <PeachyMenu.List>
              <PeachyMenu.Item
                v-for="link in inputLinks"
                :key="link.key"
                @click="router.push(link.to)">
                {{ link.title }}
              </PeachyMenu.Item>
            </PeachyMenu.List>
          </PeachyMenu.Target>
        </PeachyMenu.Menu>
      </PeachyMenu.List>
    </PeachyMenu.Target>
  </PeachyMenu.Menu>

  <a href="https://github.com/norahmaria/typeach" aria-label="Github">
    <unicon name="github" />
  </a>
</template>

<script lang="ts" setup>
  import { ref } from "vue";
  import { useRouter } from "vue-router";
  import { PeachyMenu } from "typeach";

  import { links, inputLinks } from "./routes/router";

  const router = useRouter();

  const componentMenuTrigger = ref<typeof PeachyMenu.Trigger>();

  const isMac = /Mac|iPhone|iPod|iPad/i.test(navigator.platform);

  window.addEventListener("keydown", e => {
    if (e.key === "k" && (e.ctrlKey || e.metaKey)) {
      componentMenuTrigger.value?.click();
    }
  });
</script>
