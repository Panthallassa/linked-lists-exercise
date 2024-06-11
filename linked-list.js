/** Node: node for a singly linked list. */

class Node {
	constructor(val) {
		this.val = val;
		this.next = null;
	}
}

/** LinkedList: chained together nodes. */

class LinkedList {
	constructor(vals = []) {
		this.head = null;
		this.tail = null;
		this.length = 0;

		for (let val of vals) this.push(val);
	}

	/** push(val): add new value to end of list. */

	push(val) {
		// create a new node
		let newNode = new Node(val);

		// if no values have been added to the linked list make the head the newNode
		if (this.tail === null) {
			this.head = newNode;
			this.tail = newNode;
		} else {
			// if tail is not null add value to end
			this.tail.next = newNode;
			this.tail = newNode;
		}
		this.length++;
	}

	/** unshift(val): add new value to start of list. */

	unshift(val) {
		// create a new node
		let newNode = new Node(val);

		if (this.head === null) {
			// if the list is empty set both head and tail to newNode
			this.head = newNode;
			this.tail = newNode;
		} else {
			// point the new node's next to current head
			newNode.next = this.head;
			// update the head to be the new node
			this.head = newNode;
		}
		this.length++;
	}

	/** pop(): return & remove last item. */

	pop() {
		// if the list is empty, throw error
		if (this.head === null) {
			throw new Error("List is empty");
		}
		// if the list has only one item, remove it and update the head and tail to null
		let nodeToRemove = this.tail;
		if (this.head === this.tail) {
			this.head = null;
			this.tail = null;
		} else {
			// if the list has multiple items, iterate to find the second last node
			let currentNode = this.head;
			while (currentNode.next !== this.tail) {
				currentNode = currentNode.next;
			}
			currentNode.next = null;
			this.tail = currentNode;
		}
		this.length--;
		return nodeToRemove.val;
	}

	/** shift(): return & remove first item. */

	shift() {
		// if the list is empty, throw error
		if (this.head === null) {
			throw new Error("List is empty");
		}

		let nodeToRemove = this.head;
		this.head = this.head.next;
		if (this.head == null) {
			this.tail = null;
		}
		this.length--;
		return nodeToRemove.val;
	}

	/** getAt(idx): get val at idx. */

	getAt(idx) {
		//  if index is less that 0, throw error
		if (idx < 0) {
			throw new Error("index is invalid");
		}

		let currentNode = this.head;
		let currentIndex = 0;

		// search list for index
		while (currentNode !== null && currentIndex < idx) {
			currentNode = currentNode.next;
			currentIndex++;
		}

		// if currentNode is null then index does not exsist and throw value
		if (currentNode === null) {
			throw new Error("Index is invalid");
		}

		return currentNode.val;
	}

	/** setAt(idx, val): set val at idx to val */

	setAt(idx, val) {
		//  if index is less that 0, throw error
		if (idx < 0) {
			throw new Error("index is invalid");
		}

		// Initialize the traversal variables
		let currentNode = this.head;
		let currentIndex = 0;

		// search list for index
		while (currentNode !== null && currentIndex < idx) {
			currentNode = currentNode.next;
			currentIndex++;
		}

		// if currentNode is null then index does not exsist and throw value
		if (currentNode === null) {
			throw new Error("Index is invalid");
		}

		currentNode.val = val;
	}

	/** insertAt(idx, val): add node w/val before idx. */

	insertAt(idx, val) {
		//  if index is less that 0, throw error
		if (idx < 0 || idx > this.length) {
			throw new Error("index is invalid");
		}

		// create the new node
		let newNode = new Node(val);

		// if inserting at head
		if (idx === 0) {
			newNode.next = this.head;
			this.head = newNode;
			// If the list was empty update tail as well
			if (!this.tail) {
				this.tail = newNode;
			}
		} else {
			let prevNode = this.head;
			for (let i = 0; i < idx - 1; i++) {
				prevNode = prevNode.next;
			}
			newNode.next = prevNode.next;
			prevNode.next = newNode;
			if (!newNode.next) {
				this.tail = newNode;
			}
		}
		this.length++;
	}

	/** removeAt(idx): return & remove item at idx, */

	removeAt(idx) {
		//  if index is less that 0, throw error
		if (idx < 0 || idx >= this.length) {
			throw new Error("index is invalid");
		}

		if (idx === 0) {
			this.head = this.head.next;
			if (!this.head) {
				this.tail = null;
			}
		} else {
			let prevNode = this.head;
			for (let i = 0; i < idx - 1; i++) {
				prevNode = prevNode.next;
			}
			prevNode.next = prevNode.next.next;
			if (!prevNode.next) {
				this.tail = prevNode;
			}
		}
		this.length--;
	}

	/** average(): return an average of all values in the list */

	average() {
		// if list is empty return null
		if (!this.head) {
			return 0;
		}

		let sum = 0;
		let count = 0;
		let currentNode = this.head;

		// iterate through list and count sum of valuesa nd number of nodes
		while (currentNode !== null) {
			sum += currentNode.val;
			count++;
			currentNode = currentNode.next;
		}
		// calculate the average
		return sum / count;
	}
}

module.exports = LinkedList;
