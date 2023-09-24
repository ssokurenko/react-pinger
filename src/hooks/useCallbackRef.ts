import { DependencyList, useCallback, useRef } from "react"

export type AnyFunction = (...args: unknown[]) => unknown

export default function useCallbackRef<T extends AnyFunction>(
  callback?: T,
  deps: DependencyList = []
) {
  const ref = useRef(callback)

  ref.current = callback

  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useCallback(((...args) => ref.current?.(...args)) as T, deps)
}
