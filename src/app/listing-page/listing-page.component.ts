import { Component, OnInit, Injectable } from '@angular/core';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import {NestedTreeControl , FlatTreeControl} from '@angular/cdk/tree';
import { SeacrhServiceService } from '../services/seacrh-service.service';
import { faDollarSign, faClock, faHeart, faBookmark } from '@fortawesome/free-solid-svg-icons';
import { MessageService } from '../services/message.service';
import { Observable, Subscription } from 'rxjs';
import {SelectionModel} from '@angular/cdk/collections';
import {BehaviorSubject} from 'rxjs';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import { CommonModule } from "@angular/common";
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDialog} from '@angular/material/dialog';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoginComponent } from '../login/login.component';
import {MatChipInputEvent} from '@angular/material/chips';

import { EmailVerificationComponent } from '../email-verification/email-verification.component';
import {ProfileService} from '../services/profile.service'
import {MatSnackBar} from '@angular/material/snack-bar';
import { Options } from 'ng5-slider';
import {Router, ActivatedRoute, ParamMap} from '@angular/router';
import {MatMenuTrigger} from '@angular/material/menu';
import { NgxSpinnerService } from 'ngx-spinner';
export class TodoItemNode {
  children: TodoItemNode[];
  item: string;
}
export class BoomarkObject{
  course_id: string;
  status:string;
  percentage:string;
  userid:any;
}

/** Flat to-do item node with expandable and level information */
export class TodoItemFlatNode {
  item: string;
  level: number;
  expandable: boolean;
  header:boolean;
  duration:boolean;
  rating:boolean;
  fee:boolean;
  divider:boolean;
  firstChild:boolean;
  parameter:string;
  parameterType:string;
} 
const personal='Personal Development';
const TREE_DATA={};
const ProgramData={
  Domain:{
  'Arts and Humanities':{
    'History':null,
    'Music and Art':null,
    'Philosophy':null
  },
  Business:{
    'Business Essentials':null,
    'Business Strategy':null,
    'Entrepreneurship':null,
    'Finance':null,
    'Leadership and Management':null,
    'Marketing':null,
    },
    'Computer Science':{
      'Algorithms':null,
      'Computer Security and Networks':null,
      'Design and Product':null,
      'Mobile and Web Development':null,
      'Software Development':null,
     },
     'Data Science':{
       'Data Analysis':null,
       'Machine Learning':null,
       'Probability and Statistics':null
     },
     Health:{
       'Animal Health':null,
       'Basic Science':null,
       'Health Informatics':null,
       'Healthcare Management':null,
       'Nutrition':null,
       'Patient Care':null,
       'Psychology':null,
       'Research':null
     },
     'Information Technology':{
       'Cloud Computing':null,
       'Data Management':null,
       'Security':null,
       'Support and Operations':null,
       },
       'Language Learning':{
         'Learning English':null,
         'Other Languages':null
       },
  'Physical Science and Engineering':{
        'Chemistry':null,
        'Electrical Engineering':null,
        'Environmental Science and Sustainability':null,
        'Mechanical Engineering':null,
        'Physics and Astronomy':null,
        'Research Methods':null
      },
      'Social Sciences':{
        'Economics':null,
        'Education':null,
        'Governance and Society':null,
        'Law':null
      },
      'Math and Logic':null,
      'Personal Development':null,
},
divider:null,
'Programe Type':{
  Course:null,
  Degree:null,
 },
divider1:null,
  Duration:{
    'duration':null
  },
  divider2:null,
  Rating:{
    'rating':null,
    },
    divider3:null,
  Fee:{
    'fee':null,
     },
     divider4:null,
  'Programe Mode':{
    'Recorded':null,
    'Live':null,
    Mixed:null
    },divider5:null,
    'Level of Difficulty':{
      'Beginner':null,
      'Intermediate':null,
      'Expert':null
    },divider6:null,
    Provider:{
      Coursera:null,
      edx:null,
      udemy:null
    },divider7:null,
    'Course Content':{
      Audio:null,
      Video:null,
      'Text Material':null
    },divider8:null,
    'Other Specifics':{
      Certification:null,
      'Alumni Status':null,
      'No Prerequisites':null,
      'Tutorials/ Practice Material':null
    },divider9:null,
    Language:{
      English:null,
       French:null
    },divider10:null,
    Transcript:{
      'English':null,
      'French':null
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
  public courseList:any[];
  public courseListCopy:any[];
  panelOpenState = false;
  totalResults:any;
  changeText: boolean;
  public regularDistribution=100/3;
  message: any;
  isLoggedIn=false;
  sortChecker:boolean=true;
  subscription: Subscription;
  flatNodeMap = new Map<TodoItemFlatNode, TodoItemNode>();
  treeControl: FlatTreeControl<TodoItemFlatNode>;
  treeControl1: FlatTreeControl<TodoItemFlatNode>;
  user:any;
  userData: firebase.User;
  bookMarkobject= new BoomarkObject();
  minValue: number = 0;
  maxValue: number = 50000;
  minDuration:number= 0;
  maxDuration:number=50;
  options: Options = {
    floor: 0,
    ceil: 50000
  };
  options1:Options={
    floor: 0,
    ceil:50
  };
  value=200;
  treeFlattener: MatTreeFlattener<TodoItemNode, TodoItemFlatNode>;
  treeFlattener1: MatTreeFlattener<TodoItemNode, TodoItemFlatNode>;
   tagList=['tag1','very  big tag','tag2','tag3','tag5','tag4','tag1','tag2','tag3','tag5','tag4']
  nestedNodeMap = new Map<TodoItemNode, TodoItemFlatNode>();
  selectedParent: TodoItemFlatNode | null = null;
 checklistSelection = new SelectionModel<TodoItemFlatNode>(true /* multiple */);
 isExpandable = (node: TodoItemFlatNode) => node.expandable;
 getChildren = (node: TodoItemNode): TodoItemNode[] => node.children;
 public removable = true;
 selectable = true;
 dataSource: MatTreeFlatDataSource<TodoItemNode, TodoItemFlatNode>;
 dataSource1: MatTreeFlatDataSource<TodoItemNode, TodoItemFlatNode>;

  getLevel = (node: TodoItemFlatNode) => node.level;
  middleFlag=false; 

  constructor(private searchService:SeacrhServiceService,private messageService:MessageService,private _database: ChecklistDatabase,
    private dialog:MatDialog,private afauth:AngularFireAuth,private pfs:ProfileService,private snackBar:MatSnackBar, private activateRouter:ActivatedRoute,private spinner: NgxSpinnerService) { 
    this.changeText= false;
    this.subscription = this.messageService.getMessage().subscribe(message => { this.searchMethod(message)});
 
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
   private courseField=['Arts and Humanities','Business','Computer Science','Data Science','Health','Information Technology','Language Learning',
   'Physical Science and Engineering','Social Sciences','Math and Logic','Personal Development' ];
   public courseFieldParam=[];
   private courseSubField=['History','Music and Art','Philosophy','Business Essentials','Business Strategy','Entrepreneurship','Finance','Leadership and Management',
  'Marketing','Algorithms','Computer Science and Technology','Design and Product','Mobile and Web Development','Software Development','Data Analysis',
'Machine Learning','Probability and Statistics','Animal Health','Basic Health','Health Informatics','Healthcare Management','Nutrition','Patient Care','Psychology','Research',
'Cloud Computing','Data Management','Security','Support and Operations','Learning English','Other Languages','Chemistry','Electrical Engineering','Enviromental Science and sustainability',
'Mechanical Engineering','Physics and Astronomy','Research Methods','Education','Economics','Governance and Society','Law',];
private programType=['Recorded','Live','Mixed'];
public courseSubFieldParam=[];
private difficultyLevel=['Beginner','Intermediate','Expert','Mixed'];
private courseprovider=['Coursera','udemy','edx'];
private contentType=['Audio','Video','Text Material'];
public loadingFirst=false;


  transformer = (node: TodoItemNode, level: number) => {
    const existingNode = this.nestedNodeMap.get(node);
    const flatNode = existingNode && existingNode.item === node.item
        ? existingNode
        : new TodoItemFlatNode();
    flatNode.item = node.item;
    flatNode.level = level;
    flatNode.expandable = !!node.children?.length;
    var courseIndex=this.courseField.indexOf(node.item);
    var courseSubFieldIndex= this.courseSubField.indexOf(node.item);
    if(courseIndex!=-1){
         flatNode.parameter='course_field';
        }
    else if(courseSubFieldIndex!==-1){
     flatNode.parameter='course_subfield';
    }
    if(level===0){
      flatNode.header = true;
      this.treeControl.expand(flatNode);
    }
    else{
      flatNode.header = false;
    }
    if(level===1){
      flatNode.firstChild=true;
    }
    if(node.item==="duration"){
      flatNode.duration=true;
      flatNode.header=false;
    }
    else {
      flatNode.duration= false;
      
    }
    if(node.item==="rating"){
      flatNode.rating=true;
      flatNode.header=false;
    }
    else {
      flatNode.rating= false;
      
    }
    if(node.item==="fee"){
      flatNode.fee=true;
      flatNode.header=false;
    }
    else {
      flatNode.fee= false;
      }
      if(node.item==="divider" || node.item==="divider1" || node.item==="divider2"|| node.item==="divider3"
      || node.item==="divider4" || node.item==="divider5"  || node.item==="divider6" || node.item==="divider7"
      || node.item==="divider8" || node.item==="divider9" || node.item==="divider10"){
        flatNode.divider=true;
        flatNode.header=false;
      }
      else {
        flatNode.divider= false;
        }

     
    this.flatNodeMap.set(flatNode, node);
    this.nestedNodeMap.set(node, flatNode);
    return flatNode;
  }
  hasChild = (_: number, _nodeData: TodoItemFlatNode) => _nodeData.expandable;
  isHeader =(_: number, _nodeData:TodoItemFlatNode)=> _nodeData.header;
  isDuration =(_: number, _nodeData:TodoItemFlatNode)=> _nodeData.duration;
  isRating =(_: number, _nodeData:TodoItemFlatNode)=> _nodeData.rating;
  isFee =(_: number, _nodeData:TodoItemFlatNode)=> _nodeData.fee;
  isDivider= (_: number, _nodeData:TodoItemFlatNode)=> _nodeData.divider;
  hasPadding=(_: number, _nodeData:TodoItemFlatNode)=>  _nodeData.level ==(1 || 2)? true:false;

   
  hasNoContent = (_: number, _nodeData: TodoItemFlatNode) => _nodeData.item === '';

  ngOnInit(): void {
    // this.searchService.getAllCourses().subscribe((response)=>{
    //    //this.courseList=response;
    //   this.courseList={
    //     'course_name':'random course',
    //     'course_time':'4h',
    //     'course_rating':'4.5'
    //   }
    //    this.totalResults=this.courseList.length;

    // });
    this.afauth.authState.subscribe(
      res => {
        if (res && res.uid) {
          console.log('user is logged in');
          console.log(res.uid);
          this.isLoggedIn=true;
         this.userData=res;
         this.pfs.getProfile(res.uid).subscribe(data=>{
           this.user=data;
           this.setBookMark(this.user);
         })
   } else {
    this.isLoggedIn=false;
           console.log('user not logged in');
        }
      },
      err=>{
        this.isLoggedIn=false;
      });
    var searchParam;
     this.activateRouter.queryParams.subscribe(params => {
      searchParam = params['search'];
      this.searchKey=searchParam;
      this.searchMethod(searchParam);
    });

    
     //this.messageService.getMessage().subscribe(message => { this.searchMethod(message) });
  }
  loading =false;
  pageSize="30";
  pageNo:number=1;
  searchKey:string;
  searchMethod(parameter):void{
    if(this.pageNo===1){
     this.loadingFirst=true;
     }
     this.loading=true;
      this.searchService.getCourseByKeyWord(parameter,this.pageNo,this.pageSize).subscribe((response:any)=>{
       if(this.pageNo===1){
        this.courseList=response.content;
      this.courseListCopy= response.content;
      this.loadingFirst= false;
       }
       else{
         this.courseList= this.courseList.concat(response.content);
         this.courseListCopy= this.courseListCopy.concat(response.content);
         this.loadingFirst= false;
       }
      this.totalResults=this.courseList.length;
      this.loading=false;
      this.pageNo= this.pageNo+1;
  });
  }
  descendantsAllSelected(node: TodoItemFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected = descendants.length > 0 && descendants.every(child => {
      return this.checklistSelection.isSelected(child);
    });
    return descAllSelected;
  }
  todoLeafItemSelectionToggle(node: TodoItemFlatNode,event): void {
    this.checklistSelection.toggle(node);
    this.checkAllParentsSelection(node);
    console.log(node,event);
    this.nodeValueMap.set(node,event.checked);
    if(event.checked===true){
      this.courseSubFieldParam.push(node.item);
    }
    else{
      const index= this.courseFieldParam.indexOf(node.item);
      this.courseFieldParam.splice(index,1);
      
    }
  
    this.filterCourse('any');
  }
  descendantsPartiallySelected(node: TodoItemFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const result = descendants.some(child => this.checklistSelection.isSelected(child));
    return result && !this.descendantsAllSelected(node);
  }
  
  todoItemSelectionToggle(node: TodoItemFlatNode,event): void {
    this.checklistSelection.toggle(node);
    const descendants = this.treeControl.getDescendants(node);
    this.checklistSelection.isSelected(node)
      ? this.checklistSelection.select(...descendants)
      : this.checklistSelection.deselect(...descendants);

    // Force update for the parent
    descendants.forEach(child => this.checklistSelection.isSelected(child));
    this.checkAllParentsSelection(node);
    console.log(node,event);
    if(node.parameter==='course_field' && event.checked){
      this.courseFieldParam.push(node.item);
    }
    else if(node.parameter==='course_field' && !event.checked){
        const index= this.courseFieldParam.indexOf(node.item);
        this.courseFieldParam.splice(index,1);
    }
    this.filterCourse("any")
    this.nodeValueMap.set(node,event.checked);
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
      console.log('node deselect');
    } else if (!nodeSelected && descAllSelected) {
      this.checklistSelection.select(node);
      this.nodeValueMap.set(node,false);
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
  changeTextMethod(item){
      item.change=true;
  }
  changeTextOutMethod(item){
      item.change=false;
  }
  comparator(course){
    console.log();
   this.messageService.addToCompare(course);
  }
  bookmarkCourse(course){
    if(this.isLoggedIn){
      if(this.userData.emailVerified){
        this.snackBar.open('Course Bookmarked','close',{
          duration:2000
        })
        this.bookMarkobject.course_id= course.course_id;
        this.bookMarkobject.userid={"uid":this.userData.uid};
        this.bookMarkCourseMap.set(course.course_id,true);
         this.searchService.bookMarkcourse(this.bookMarkobject).subscribe(data=>{
          
         },err=>{
           if(err='success'){
            this.snackBar.open('Course BookMarked','close',{
              duration:2000,
            })
           }
         })
      }else{
        const dialogRef1 = this.dialog.open(EmailVerificationComponent,{
          height:'520px',
          minWidth:'411px',
          position:{
            top: '15vh',
             },
             
        }
        );
        this.userData.sendEmailVerification().then(result=>{
          course.bookmarked=!course.bookmarked;
          dialogRef1.close();
        },
        err=>{
               console.log('not verified')
        })
      }
       }
       else{
        const dialogRef = this.dialog.open(LoginComponent,{
          height:'520px',
          minWidth:'411px',
          position:{
            top: '15vh',
             },
             disableClose: true
        }
        );
       }
  }
  public bookMarkCourseMap= new Map<string,boolean>();
  public nodeValueMap = new Map<any,boolean>();
  public filterList=[];
  setBookMark(user){
     for(var index=0;index<user.bookmarks.length;index++){
      //  this.bookMarkCourseMap[user.bookmarks[index].courseid]=true;
      this.bookMarkCourseMap.set(user.bookmarks[index].course_id,true);
     }
  }
  isBookMark(course){
    if(this.bookMarkCourseMap[course.course_id]){
      return true;}
     else {
       return false;
     }
     };
   filterCourse(params){
     this.courseList=  this.courseListCopy;

      this.courseList= this.courseList.filter(course=>{

       return this.doCourseFieldFilter(course);
      });
   } 
   doCourseFieldFilter(course){
     if(this.courseFieldParam.length==0){
       return true
     }
     var result=false;
         for(var i=0;i<this.courseFieldParam.length;i++){
       result= result || course.course_field.includes(this.courseFieldParam[i]);
         }
         return result;
   } 
   doCourseSubFieldFilter(course){
    if(this.courseSubFieldParam.length==0){
      return true
    }
    var result=false;
        for(var i=0;i<this.courseSubFieldParam.length;i++){
      result= result || course.course_subfield.includes(this.courseSubFieldParam[i]);
        }
        return result;
  } 
  onScroll(){
    this.spinner.show();
    if(this.loading===true){
      return;
    }
    else{
      this.searchMethod(this.searchKey);
      console.log('start searching');
     
    }
  }
  clicked45(){
     this.middleFlag=!this.middleFlag;
  }

}
