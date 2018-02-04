export class TreeNode {
	public parent: TreeNode;
	public children: TreeNode[] = [];

	public get root(): TreeNode|null {
		if (this.parent) {
			return this.parent.root;
		} else {
			return null;
		}
	}

	public addChild(child: TreeNode): this {
		this.children.push(child);
		return this;
	}

	public removeChild(child: TreeNode, deep: boolean = false): this {
		const index = this.children.findIndex((element) => element === child);
		if (index > -1) {
			this.children.splice(index, 1);
		} else if (deep) {
			this.children.forEach((deepChild) => {
				deepChild.removeChild(child, true);
			});
		}

		return this;
	}

	public setChildren(children: TreeNode[]): this {
		this.children = children;
		return this;
	}

	public addChildren(children: TreeNode[]): this {
		this.children.push.apply(this.children, children);
		return this;
	}

	public hasChildren(): boolean {
		return this.children.length > 0;
	}

	public iterateParents(callback: (parent: TreeNode) => {}): this {
		if (this.parent) {
			callback(this.parent);
			this.parent.iterateParents(callback);
		}

		return this;
	}

	public iterateChildren(callback: (child: TreeNode) => void, deep: boolean = true): this {
		this.children.forEach((child) => {
			callback(child);
			if (deep) {
				child.iterateChildren(callback);
			}
		});

		return this;
	}

}
