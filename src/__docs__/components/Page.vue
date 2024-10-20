<template>
  <article>
    <section class="introduction">
      <div class="content">
        <div
          style="
            width: fit-content;
            display: flex;
            flex-direction: column;
            gap: 0.25em;
          ">
          <h1 style="width: fit-content">{{ title }}</h1>
          <RouterLink v-if="isInput" :to="{ name: 'input' }" class="badge">
            Input
          </RouterLink>
        </div>
        <p v-if="description">{{ description }}</p>
      </div>
    </section>

    <section v-if="filteredSections.length">
      <ul class="content table-of-content">
        <li v-for="section in filteredSections" :key="section.url">
          <a :href="`#${section.url}`">
            {{ section.title }}
          </a>
        </li>
      </ul>
    </section>

    <section v-if="$slots.preview" class="preview">
      <div class="content">
        <slot name="preview" />
      </div>
    </section>

    <template v-for="section in filteredSections" :key="section">
      <section v-if="$slots[section.url]">
        <h2 :id="section.url">
          <a :href="`#${section.url}`">{{ section.title }}</a>
        </h2>

        <div class="content">
          <slot :name="section.url" />
        </div>
      </section>
    </template>
  </article>
</template>

<script lang="ts" setup>
  import { computed, toRef, useSlots } from "vue";

  export interface PageProps {
    title: string;
    description?: string;
    sections?: string[];
    isInput?: boolean;
  }

  const props = withDefaults(defineProps<PageProps>(), {
    description: undefined,
    sections: () => [],
    isInput: false,
  });

  const slots = useSlots();

  const sectionsRef = toRef(props, "sections");

  const filteredSections = computed(() => {
    const allSections = [
      "Anatomy",
      "API",
      "Styling",
      "Accessibility",
      ...sectionsRef.value,
      "Resources",
    ];

    return allSections
      .map(section => ({
        title: section,
        url: section.replaceAll(" ", "-").toLowerCase(),
      }))
      .filter(s => !!slots[s.url]?.());
  });
</script>

<style>
  :has(.badge) {
    position: relative;
  }

  .badge {
    z-index: 10;
    width: max-content;

    position: absolute;
    top: 50%;
    right: -1em;

    transform: translateY(calc(-50% + 0.25em)) translateX(100%);

    line-height: 1;
    font-size: 1.25rem;

    background-color: hsla(109, 34%, 48%, 0.8);
    color: hsl(109, 34%, 11%);

    padding-inline: 0.4em;
    padding-block: 0.25em;
    border-radius: var(--border-radius);
  }

  @media (width <= 30rem) {
    .badge {
      position: static;
      transform: none;
    }
  }
</style>
