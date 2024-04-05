class Node:
    data = None
    next = None


class Ll:
    head = None

    def __init__(this):
        this.head = Node()

    def __str__(this):
        ll = ""
        temp = this.head
        while temp.data != None:
            ll += str(temp.data)
            temp = temp.next
        return ll

    def inSert(this, *argv):
        temp = this.head
        while temp.next != None:
            temp = temp.next
        for i in argv:
            temp.next = Node()
            temp.data = i
            temp = temp.next


ll = Ll()
ll.inSert([i for i in range(10)])

print(ll)
