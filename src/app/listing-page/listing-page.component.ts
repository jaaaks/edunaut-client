import { Component, OnInit, Injectable } from '@angular/core';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import {NestedTreeControl , FlatTreeControl} from '@angular/cdk/tree';
import { SeacrhServiceService } from '../services/seacrh-service.service';
import { faDollarSign, faClock, faHeart, faBookmark } from '@fortawesome/free-solid-svg-icons';
import { MessageService } from '../services/message.service';
import { Subscription } from 'rxjs';
import {SelectionModel} from '@angular/cdk/collections';
import {BehaviorSubject} from 'rxjs';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import { CommonModule } from "@angular/common";
import {MatCheckboxModule} from '@angular/material/checkbox';




export class TodoItemNode {
  children: TodoItemNode[];
  item: string;
}

/** Flat to-do item node with expandable and level information */
export class TodoItemFlatNode {
  item: string;
  level: number;
  expandable: boolean;
} 
const personal='Personal Development';
const TREE_DATA = {
  'Personal Development':{
    'Random Value':null,
    'Random Value2':null
  },
  Engineering: {
    'Mechanical Engineering': null,
    'chemical Engineering': null,
    'Computer Science Engineering':null
    },
  Reminders: [
    'Cook dinner',
    'Read the Material Design spec',
    'Upgrade Application to Angular'
  ]
};
const ProgramData={
  Course:{
    'Random Value':null,
    'Random Value2':null
  },
  Degree:{
    'Random Value':null,
    'Random Value2':null
  }
}
@Injectable()
export class ChecklistDatabase {
  dataChange = new BehaviorSubject<TodoItemNode[]>([]);
  dataChange1 = new BehaviorSubject<TodoItemNode[]>([]);

  get data(): TodoItemNode[] { return this.dataChange.value; }

  constructor() {
    this.initialize();
  }
  initialize() {
    // Build the tree nodes from Json object. The result is a list of `TodoItemNode` with nested
    //     file node as children.
    const data = this.buildFileTree(TREE_DATA, 0);
    const programTypeData= this.buildFileTree(ProgramData,0);

    // Notify the change.
    this.dataChange.next(data);
    this.dataChange1.next(programTypeData);
  }

  /**
   * Build the file structure tree. The `value` is the Json object, or a sub-tree of a Json object.
   * The return value is the list of `TodoItemNode`.
   */
  buildFileTree(obj: {[key: string]: any}, level: number): TodoItemNode[] {
    return Object.keys(obj).reduce<TodoItemNode[]>((accumulator, key) => {
      const value = obj[key];
      const node = new TodoItemNode();
      node.item = key;

      if (value != null) {
        if (typeof value === 'object') {
          node.children = this.buildFileTree(value, level + 1);
        } else {
          node.item = value;
        }
      }

      return accumulator.concat(node);
    }, []);
  }

  /** Add an item to to-do list */
  insertItem(parent: TodoItemNode, name: string) {
    if (parent.children) {
      parent.children.push({item: name} as TodoItemNode);
      this.dataChange.next(this.data);
    }
  }

  updateItem(node: TodoItemNode, name: string) {
    node.item = name;
    this.dataChange.next(this.data);
  }
}

@Component({
  selector: 'app-listing-page',
  templateUrl: './listing-page.component.html',
  styleUrls: ['./listing-page.component.scss'],
  providers: [ChecklistDatabase]
})
export class ListingPageComponent implements OnInit {
  faDollarSign= faDollarSign;
  faClock = faClock;
  faHeart = faHeart;
  public courseList;
  totalResults:any;
  public regularDistribution=100/3;
  message: any;
  sortChecker:boolean=true;
  subscription: Subscription;
  flatNodeMap = new Map<TodoItemFlatNode, TodoItemNode>();
  treeControl: FlatTreeControl<TodoItemFlatNode>;
  treeControl1: FlatTreeControl<TodoItemFlatNode>;

  treeFlattener: MatTreeFlattener<TodoItemNode, TodoItemFlatNode>;
  treeFlattener1: MatTreeFlattener<TodoItemNode, TodoItemFlatNode>;

  nestedNodeMap = new Map<TodoItemNode, TodoItemFlatNode>();
  selectedParent: TodoItemFlatNode | null = null;
 checklistSelection = new SelectionModel<TodoItemFlatNode>(true /* multiple */);
 isExpandable = (node: TodoItemFlatNode) => node.expandable;
 getChildren = (node: TodoItemNode): TodoItemNode[] => node.children;

 dataSource: MatTreeFlatDataSource<TodoItemNode, TodoItemFlatNode>;
 dataSource1: MatTreeFlatDataSource<TodoItemNode, TodoItemFlatNode>;

  getLevel = (node: TodoItemFlatNode) => node.level;
  max=100000;
  min=0;
  value=0;
  step=1;

  constructor(private searchService:SeacrhServiceService,private messageService:MessageService,private _database: ChecklistDatabase) { 
  
    this.subscription = this.messageService.getMessage().subscribe(message => { this.searchMethod(message) });
 
    this.treeFlattener = new MatTreeFlattener(this.transformer, this.getLevel,
      this.isExpandable, this.getChildren);
    this.treeControl = new FlatTreeControl<TodoItemFlatNode>(this.getLevel, this.isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

    this.treeFlattener1 = new MatTreeFlattener(this.transformer, this.getLevel,
      this.isExpandable, this.getChildren);
    this.treeControl1 = new FlatTreeControl<TodoItemFlatNode>(this.getLevel, this.isExpandable);
    this.dataSource1 = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
    _database.dataChange.subscribe(data => {
      this.dataSource.data = data;
    });

    _database.dataChange1.subscribe(data => {
      this.dataSource1.data = data;
      
    });
  }
  transformer = (node: TodoItemNode, level: number) => {
    const existingNode = this.nestedNodeMap.get(node);
    const flatNode = existingNode && existingNode.item === node.item
        ? existingNode
        : new TodoItemFlatNode();
    flatNode.item = node.item;
    flatNode.level = level;
    flatNode.expandable = !!node.children?.length;
    this.flatNodeMap.set(flatNode, node);
    this.nestedNodeMap.set(node, flatNode);
    return flatNode;
  }
  hasChild = (_: number, _nodeData: TodoItemFlatNode) => _nodeData.expandable;
  hasNoContent = (_: number, _nodeData: TodoItemFlatNode) => _nodeData.item === '';

  ngOnInit(): void {
    this.searchService.getAllCourses().subscribe((response)=>{
       this.courseList=response;
       this.totalResults=this.courseList.length;

    });
  }
  searchMethod(parameter):void{
   
    this.searchService.getCourseByKeyWord(parameter.text).subscribe((response)=>{
      this.courseList=response;
      this.totalResults=this.courseList.length;
   });
  }
  descendantsAllSelected(node: TodoItemFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected = descendants.length > 0 && descendants.every(child => {
      return this.checklistSelection.isSelected(child);
    });
    return descAllSelected;
  }

  descendantsPartiallySelected(node: TodoItemFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const result = descendants.some(child => this.checklistSelection.isSelected(child));
    return result && !this.descendantsAllSelected(node);
  }
  
  todoItemSelectionToggle(node: TodoItemFlatNode): void {
    this.checklistSelection.toggle(node);
    const descendants = this.treeControl.getDescendants(node);
    this.checklistSelection.isSelected(node)
      ? this.checklistSelection.select(...descendants)
      : this.checklistSelection.deselect(...descendants);

    // Force update for the parent
    descendants.forEach(child => this.checklistSelection.isSelected(child));
    this.checkAllParentsSelection(node);
  }

  checkAllParentsSelection(node: TodoItemFlatNode): void {
    let parent: TodoItemFlatNode | null = this.getParentNode(node);
    while (parent) {
      this.checkRootNodeSelection(parent);
      parent = this.getParentNode(parent);
    }
  }
  checkRootNodeSelection(node: TodoItemFlatNode): void {
    const nodeSelected = this.checklistSelection.isSelected(node);
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected = descendants.length > 0 && descendants.every(child => {
      return this.checklistSelection.isSelected(child);
    });
    if (nodeSelected && !descAllSelected) {
      this.checklistSelection.deselect(node);
    } else if (!nodeSelected && descAllSelected) {
      this.checklistSelection.select(node);
    }
  }
     getParentNode(node: TodoItemFlatNode): TodoItemFlatNode | null {
    const currentLevel = this.getLevel(node);

    if (currentLevel < 1) {
      return null;
    }

    const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;

    for (let i = startIndex; i >= 0; i--) {
      const currentNode = this.treeControl.dataNodes[i];

      if (this.getLevel(currentNode) < currentLevel) {
        return currentNode;
      }
    }
    return null;
  }
  sortCheck(){
    this.sortChecker= (this.sortChecker== true?false:true);
  }
  public compareChecker= true;
  compareCheck(){
    this.compareChecker= (this.compareChecker== true?false:true);
  }

}
