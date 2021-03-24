<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
            <a
                class="navbar-brand"
                href="#">
                Stringulator
            </a>
            <button
                class="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbar"
                aria-controls="navbar"
                aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon" />
            </button>
            <div
                id="navbar"
                class="collapse navbar-collapse">
                <span class="text-muted">
                    Quick & dirty circular string art simulator
                </span>
                <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a
                            class="nav-link"
                            href="https://github.com/dvuckovic/stringulator/"
                            title="Github"
                            target="_blank">
                            <BootstrapIcon
                                icon="github"
                                size="lg" />
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'Navigation',
});
</script>

<style lang="scss">
.bi {
    &-github {
        font-size: 1.5em;
    }
}
</style>
