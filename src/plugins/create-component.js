import Vue from 'vue'
import { createAPI } from 'cube-ui'
import Hello from '@/components/HelloWorld'

createAPI(Vue, Hello, ['click'], true)
