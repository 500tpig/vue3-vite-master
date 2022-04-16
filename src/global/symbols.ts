import { InjectionKey, Ref } from 'vue'

export const CollapseKey: InjectionKey<Ref<boolean>> = Symbol('collapse')
