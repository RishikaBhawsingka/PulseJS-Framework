const subscribers = new Set();

function hello() {
    console.log("Hello");
}

function bye() {
    console.log("Bye");
}

subscribers.add(hello);
subscribers.add(bye);
subscribers.add(hello); // duplicate

subscribers.forEach(fn => fn());

console.log(subscribers.size);