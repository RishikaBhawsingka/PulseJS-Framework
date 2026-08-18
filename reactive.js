
import { track, trigger } from "./dependency.js";

export function reactive(object) {

    return new Proxy(object, {

        get(target, property) {
            console.log("Reading:", property);
             track(target, property);
            return Reflect.get(target, property);
        },

       set(target, property, value) {
          console.log("Changing:", property, "to", value);

           const result = Reflect.set(target, property, value);

           trigger(target, property);

          return result;
        }
    });

}