import { Dispatch, SetStateAction, useEffect, useState } from "react"

import useCallbackRef from "./useCallbackRef"

type LocalStorageSetOptions<T> = {
  serializer?: (value: T) => string
}

type LocalStorageGetOptions<T> = {
  deserializer?: (value: string) => T
}

function set<T>(
  key: string,
  value: T | undefined,
  options: LocalStorageSetOptions<T> = {}
) {
  const { serializer = JSON.stringify } = options

  try {
    window.localStorage.setItem(key, serializer(value))
  } catch (error) {
    console.error(error)
  }
}

function get<T>(
  key: string,
  options: LocalStorageGetOptions<T> = {}
): T | undefined {
  const { deserializer = JSON.parse } = options

  try {
    const item = window.localStorage.getItem(key)

    if (item !== null) return deserializer(item)

    return undefined
  } catch {
    return undefined
  }
}

function remove<T>(key: string): T | undefined {
  try {
    window.localStorage.removeItem(key)
    return undefined
  } catch {
    return undefined
  }
}

const localStorage = {
  set,
  get,
  remove,
}

const initialize = <T>(
  key: string,
  initialValue: T | undefined,
  options?: UseLocalStorageOptions<T>
) => {
  const existingValue = localStorage.get<T>(key, options)

  if (existingValue !== undefined) return existingValue

  initialValue && localStorage.set(key, initialValue, options)

  return initialValue
}

type SetValue<T> = Dispatch<SetStateAction<T>>

export type UseLocalStorageOptions<T> = {
  deserializer?: (value: string) => T
  serializer?: (value: T) => string
}

export default function useLocalStorage<T>(
  key: string,
  initialValue?: T,
  options?: UseLocalStorageOptions<T>
): [T | undefined, SetValue<T | undefined>, () => void] {
  const [state, setState] = useState<T | undefined>(() =>
    initialize(key, initialValue, options)
  )

  useEffect(() => {
    setState(initialize(key, initialValue, options))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])

  const set: SetValue<T | undefined> = useCallbackRef((valOrFunc: unknown) => {
    const newValue =
      valOrFunc instanceof Function ? valOrFunc(state) : valOrFunc

    localStorage.set(key, newValue, options)

    setState(newValue)
  })

  const remove = useCallbackRef(() => {
    try {
      localStorage.remove(key)
      setState(undefined)
    } catch {
      console.error("localStorage")
    }
  })

  return [state, set, remove]
}
