package DataStructure_Algorithm.Search;

import java.util.NoSuchElementException;
import java.util.Scanner;

public class RedBlackTree<Key extends Comparable<Key>, Value> {
    private Node root;

    private static final boolean RED = true;
    private static final boolean BLACK = false;

    private class Node {
        Key key;
        Value val;
        Node left, right;
        int N; // To instore the sum of the Nodes in this subtree
        boolean color;

        Node(Key key, Value val, int N, boolean color) {
            this.key = key;
            this.val = val;
            this.N = N;
            this.color = color;
        }
    }

    private boolean isRed(Node x) {
        if (x == null)
            return false;
        return x.color == RED;
    }

    Node lRotate(Node h) {
        Node x = h.right;
        h.right = x.left;
        x.left = h;
        x.color = h.color;
        h.color = RED;
        x.N = h.N;
        h.N = size(h.left) + size(h.right) + 1;
        return x;
    }

    Node rRotate(Node h) {
        Node x = h.left;
        h.left = x.right;
        x.right = h;
        x.color = h.color;
        h.color = RED;
        x.N = h.N;
        h.N = size(h.left) + size(h.right) + 1;
        return x;
    }

    private void flipColors(Node h) {
        // h must have opposite color of its two children
        // assert (h != null) && (h.left != null) && (h.right != null);
        // assert (!isRed(h) && isRed(h.left) && isRed(h.right))
        // || (isRed(h) && !isRed(h.left) && !isRed(h.right));
        h.color = !h.color;
        h.left.color = !h.left.color;
        h.right.color = !h.right.color;
    }

    public boolean isEmpty() {
        return size() == 0;
    }

    public int size() {
        return size(root);
    }

    private int size(Node x) {
        if (x == null)
            return 0;
        else
            return x.N;
    }

    public void put(Key key, Value val) {
        root = put(root, key, val);
        root.color = BLACK;
    }

    private Node put(Node h, Key key, Value val) {
        if (h == null)
            return new Node(key, val, 1, RED);

        int cmp = key.compareTo(h.key);
        if (cmp < 0)
            h.left = put(h.left, key, val);
        else if (cmp > 0)
            h.right = put(h.right, key, val);
        else
            h.val = val;

        if (isRed(h.right) && !isRed(h.left))
            h = lRotate(h);
        if (isRed(h.left) && isRed(h.left.left))
            h = rRotate(h);
        if (isRed(h.left) && isRed(h.right))
            flipColors(h);

        h.N = size(h.left) + size(h.right) + 1;
        return h;
    }

    private Node moveRedLeft(Node h) {
        // h.left.color = h.left.left.color = black
        // which implied that h.left and h.right are both 2-node
        flipColors(h); // Combine h, h.left, h.right into a 4-node
        if (isRed(h.right.left)) {
            h.right = rRotate(h.right);
            h = lRotate(h);
            flipColors(h);
        }
        return h;
    }

    // Assuming that h is red and both h.right and h.right.left
    // are black, make h.right or one of its children red.
    private Node moveRedRight(Node h) {
        // assert (h != null);
        // assert isRed(h) && !isRed(h.right) && !isRed(h.right.left);
        flipColors(h);
        if (isRed(h.left.left)) {
            h = rRotate(h);
            flipColors(h);
        }
        return h;
    }

    private Node balance(Node h) {
        // assert (h != null);

        if (isRed(h.right) && !isRed(h.left))
            h = lRotate(h);
        if (isRed(h.left) && isRed(h.left.left))
            h = rRotate(h);
        if (isRed(h.left) && isRed(h.right))
            flipColors(h);

        h.N = size(h.left) + size(h.right) + 1;
        return h;
    }

    public void deleteMin() {
        if (isEmpty())
            throw new NoSuchElementException("BST underflow");

        // if both children of root are black, set root to red
        if (!isRed(root.left) && !isRed(root.right))
            root.color = RED;

        root = deleteMin(root);
        if (!isEmpty())
            root.color = BLACK;
        // assert check();
    }

    // delete the key-value pair with the minimum key rooted at h
    private Node deleteMin(Node h) {
        if (h.left == null)
            return null;

        if (!isRed(h.left) && !isRed(h.left.left))
            h = moveRedLeft(h);

        h.left = deleteMin(h.left);
        return balance(h);
    }

    public void delete(Key key) {
        if (key == null)
            throw new IllegalArgumentException("argument to delete() is null");
        if (!contains(key))
            return;

        // if both children of root are black, set root to red
        if (!isRed(root.left) && !isRed(root.right))
            root.color = RED;

        root = delete(root, key);
        if (!isEmpty())
            root.color = BLACK;
        // assert check();
    }

    // delete the key-value pair with the given key rooted at h
    private Node delete(Node h, Key key) {
        // assert get(h, key) != null;

        if (key.compareTo(h.key) < 0) {
            if (!isRed(h.left) && !isRed(h.left.left))
                h = moveRedLeft(h);
            h.left = delete(h.left, key);
        } else {
            if (isRed(h.left))
                h = rRotate(h);
            if (key.compareTo(h.key) == 0 && (h.right == null))
                return null;
            if (!isRed(h.right) && !isRed(h.right.left))
                h = moveRedRight(h);
            if (key.compareTo(h.key) == 0) {
                Node x = min(h.right);
                h.key = x.key;
                h.val = x.val;
                // h.val = get(h.right, min(h.right).key);
                // h.key = min(h.right).key;
                h.right = deleteMin(h.right);
            } else
                h.right = delete(h.right, key);
        }
        return balance(h);
    }

    public Key min() {
        if (isEmpty())
            throw new NoSuchElementException("calls min() with empty symbol table");
        return min(root).key;
    }

    private Node min(Node x) {
        // assert x != null;
        if (x.left == null)
            return x;
        else
            return min(x.left);
    }

    public boolean contains(Key key) {
        return get(key) != null;
    }

    public void tranverse() {
        tranverse(root);
    }

    public Value get(Key key) {
        if (key == null)
            throw new IllegalArgumentException("argument to get() is null");
        return get(root, key);
    }

    // value associated with the given key in subtree rooted at x; null if no such
    // key
    private Value get(Node x, Key key) {
        while (x != null) {
            int cmp = key.compareTo(x.key);
            if (cmp < 0)
                x = x.left;
            else if (cmp > 0)
                x = x.right;
            else
                return x.val;
        }
        return null;
    }

    private void tranverse(Node h) {
        if (h == null)
            return;
        tranverse(h.left);
        System.out.println(h.val);
        tranverse(h.right);
    }

    public static void main(String args[]) {
        RedBlackTree<Integer, String> rbt = new RedBlackTree<>();
        Scanner scanner = new Scanner(System.in);
        while (true) {
            System.out.println("Input a key(int) (-1 to end)...");
            int key = scanner.nextInt();
            if (key == -1) {
                break;
            }
            System.out.println("Input a value(String)...");
            String value = scanner.next();
            rbt.put(key, value);
        }
        scanner.close();
        System.out.println("Insertion finished...");

        rbt.tranverse();

        System.out.println("\n");

        rbt.delete(6);

        rbt.tranverse();
    }
}
