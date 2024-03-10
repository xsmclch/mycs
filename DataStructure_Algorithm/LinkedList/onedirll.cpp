#include<iostream>

struct Node{
	int data;
	Node* next;
};

class LinkedList{
	private:
		Node* head;
	public:
		LinkedList(): head(nullptr){}

		// 在链表末尾增添节点
		void addNode(int value);
		void show();
		int length();
		void insertNode(int pos, int val);
		void deleteNode(int pos);
		void deleteList();
};

void LinkedList::addNode(int value)
{
	Node* newNode = new Node();
	newNode->data = value;
	newNode->next = nullptr;

	if (head == nullptr)
		head = newNode;
	else{
		Node* temp = head;
		while (temp->next != nullptr)
			temp = temp->next;
		temp->next = newNode;
	}
}

void LinkedList::show()
{
	Node* temp = head;
	while (true)
	{
		std::cout << temp->data << std::endl;
		if (temp->next == nullptr)
			break;
		temp = temp->next;
	}
}

int LinkedList::length()
{
	if (head->next == nullptr)
		return 0;
	Node* temp = head;
	int length = 1;
	while (temp->next != nullptr)
	{
		temp = temp->next;
		length++;
	}
	return length;
}

void LinkedList::insertNode(int pos, int val)
{
	if (pos == 0 || pos >= this->length())
	{
		std::cerr << "Index out of range!\n";
		return;
	}
	if (pos == 1)
	{
		Node* newNode = new Node();
		newNode->data = val;
		newNode->next = head;
		head = newNode;
		return;
	}
	
	Node* temp = head;
	for (int i = 0; i < pos - 2; i++)
		temp = temp->next;
	Node* newNode = new Node();
	newNode->data = val;
	newNode->next = temp->next;
	temp->next = newNode;
	return;	
}	

void LinkedList::deleteNode(int pos)
{
	if (pos == 0 || pos >= this->length())
	{
		std::cerr << "Index out of range!\n";
		return;
	}
	Node* temp = head;
	if (pos == 1)
	{
		head = head->next;
		delete temp;
		temp = nullptr;
		return;
	}
	
	for (int i = 0; i < pos - 2; i++)
		temp = temp->next;
//	Node* temp2 = temp;
//	temp->next = temp->next->next; BAD!!!!
	Node* temp2 = temp->next->next;
	delete temp->next;
	temp->next = temp2;
	return;	
}

// void LinkedList::deleteList()
// {
// 	if (this->next == nullptr)
// 		return this;
// 	Node* temp = this.deleteList();
// }

int main()
{
	int value = 0;
	char ans = 'n';
	int pos = 1;
	int insval = 0;
	std::cout << "Keep enter numbers, and enter '0' to end\n";
	std::cin >> value;
	LinkedList ll;
	ll.addNode(value);
	while (value != 0)
	{
		std::cin >> value;
		ll.addNode(value);
	}
	std::cout << "Now show it!\n";
	ll.show();
	std::cout << "Want to insert?[y/Y]\n";
	std::cin >> ans;
	if (ans == 'y' || ans == 'Y')
	{
		std::cout << "Now enter the position you want to insert...\n";
		std::cin >> pos;
		std::cout << "Now enter the value...\n";
		std::cin >> insval;
		ll.insertNode(pos, insval);
	}
	std::cout << "Now show it!\n";
	ll.show();
	ans = 'n';
	std::cout << "Want to delete?[y/Y]\n";
	std::cin >> ans;
	if (ans == 'y' || ans == 'Y')
	{
		std::cout << "Now enter the position you want to delete...\n";
		std::cin >> pos;
		ll.deleteNode(pos);
	}
	std::cout << "Now show it!\n";
	ll.show();
	
	return 0;
}	
