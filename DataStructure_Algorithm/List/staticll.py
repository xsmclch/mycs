class Node:
    def __init__(self, data=None):
        self.data = data
        self.next = None

class StaticLinkedList:
    def __init__(self):
        self.head = None

    def append(self, data):
        if not self.head:
            self.head = Node(data)
        else:
            cur = self.head
            while cur.next:
                cur = cur.next
            cur.next = Node(data)

    def display(self):
        elements = []
        cur_node = self.head
        while cur_node:
            elements.append(cur_node.data)
            cur_node = cur_node.next
        return elements

# 使用
sll = StaticLinkedList()
sll.append('A')
sll.append('B')
sll.append('C')
print(sll.display())  # 输出: ['A', 'B', 'C']
