import { AsyncFactoryFn } from '@angular/cdk/testing';
import { BaseHarnessFilters } from '@angular/cdk/testing';
import { ComponentHarness } from '@angular/cdk/testing';
import { ContentContainerComponentHarness } from '@angular/cdk/testing';
import { HarnessPredicate } from '@angular/cdk/testing';
import { TestElement } from '@angular/cdk/testing';

/** Harness for interacting with a standard mat-tree in tests. */
export declare class MatTreeHarness extends ComponentHarness {
    /** The selector for the host element of a `MatTableHarness` instance. */
    static hostSelector: string;
    /**
     * Gets a `HarnessPredicate` that can be used to search for a tree with specific attributes.
     * @param options Options for narrowing the search
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options?: TreeHarnessFilters): HarnessPredicate<MatTreeHarness>;
    /** Gets all of the nodes in the tree. */
    getNodes(filter?: TreeNodeHarnessFilters): Promise<MatTreeNodeHarness[]>;
    /**
     * Gets an object representation for the visible tree structure
     * If a node is under an unexpanded node it will not be included.
     * Eg.
     * Tree (all nodes expanded):
     * `
     * <mat-tree>
     *   <mat-tree-node>Node 1<mat-tree-node>
     *   <mat-nested-tree-node>
     *     Node 2
     *     <mat-nested-tree-node>
     *       Node 2.1
     *       <mat-tree-node>
     *         Node 2.1.1
     *       <mat-tree-node>
     *     <mat-nested-tree-node>
     *     <mat-tree-node>
     *       Node 2.2
     *     <mat-tree-node>
     *   <mat-nested-tree-node>
     * </mat-tree>`
     *
     * Tree structure:
     * {
     *  children: [
     *    {
     *      text: 'Node 1',
     *      children: [
     *        {
     *          text: 'Node 2',
     *          children: [
     *            {
     *              text: 'Node 2.1',
     *              children: [{text: 'Node 2.1.1'}]
     *            },
     *            {text: 'Node 2.2'}
     *          ]
     *        }
     *      ]
     *    }
     *  ]
     * };
     */
    getTreeStructure(): Promise<TextTree>;
    /**
     * Recursively collect the structured text of the tree nodes.
     * @param nodes A list of tree nodes
     * @param level The level of nodes that are being accounted for during this iteration
     * @param parentExpanded Whether the parent of the first node in param nodes is expanded
     */
    private _getTreeStructure;
    private _addChildToNode;
}

/** Harness for interacting with a standard Angular Material tree node. */
export declare class MatTreeNodeHarness extends ContentContainerComponentHarness<string> {
    /** The selector of the host element of a `MatTreeNode` instance. */
    static hostSelector: string;
    _toggle: AsyncFactoryFn<TestElement | null>;
    /**
     * Gets a `HarnessPredicate` that can be used to search for a tree node with specific attributes.
     * @param options Options for narrowing the search
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options?: TreeNodeHarnessFilters): HarnessPredicate<MatTreeNodeHarness>;
    /** Whether the tree node is expanded. */
    isExpanded(): Promise<boolean>;
    /** Whether the tree node is disabled. */
    isDisabled(): Promise<boolean>;
    /** Gets the level of the tree node. Note that this gets the aria-level and is 1 indexed. */
    getLevel(): Promise<number>;
    /** Gets the tree node's text. */
    getText(): Promise<string>;
    /** Toggles node between expanded/collapsed. Only works when node is not disabled. */
    toggle(): Promise<void>;
    /** Expands the node if it is collapsed. Only works when node is not disabled. */
    expand(): Promise<void>;
    /** Collapses the node if it is expanded. Only works when node is not disabled. */
    collapse(): Promise<void>;
}

export declare type TextTree = {
    text?: string;
    children?: TextTree[];
};

/** A set of criteria that can be used to filter a list of tree harness instances */
export declare interface TreeHarnessFilters extends BaseHarnessFilters {
}

/** A set of criteria that can be used to filter a list of node harness instances. */
export declare interface TreeNodeHarnessFilters extends BaseHarnessFilters {
    /** Only find instances whose text matches the given value. */
    text?: string | RegExp;
    /** Only find instances whose disabled state matches the given value. */
    disabled?: boolean;
    /** Only find instances whose expansion state matches the given value. */
    expanded?: boolean;
    /** Only find instances whose level matches the given value. */
    level?: number;
}

export { }
