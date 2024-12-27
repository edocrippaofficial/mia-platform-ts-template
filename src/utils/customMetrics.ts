import type { Metric } from 'prom-client'
const customMetrics: Map<string, Metric> = new Map()

export function addCustomMetric(customMetric: Metric, name: string) {
  customMetrics.set(name, customMetric)
}

export function getCustomMetric(name: string) {
  return customMetrics.get(name)
}
