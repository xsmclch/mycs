class Node {
    data = undefined;
    next = undefined;
}

class Ll {
    head = undefined;
    constructor() {
        this.head = new Node();
    }
    insert(num) {
        let temp = this.head;
        while (temp.data != undefined) {
            temp = temp.next;
        }
        temp.next = new Node();
        temp.data = num;
    }
    show() {
        let str = '';
        let temp = this.head;
        while (temp.data != undefined) {
            str += `${temp.data.toString()} `;
            temp = temp.next;
        }
        console.log(str);
    }
}

let ll = new Ll();
for (let i = 0; i < 10; i++) {
    ll.insert(i);
}

ll.show();