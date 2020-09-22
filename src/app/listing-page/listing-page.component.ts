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
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import { BottomSheetComponent } from '../bottom-sheet/bottom-sheet.component';

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
  courseid: string;
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
  advance:boolean;
  advadedHeader:boolean;
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
    Advanced:{
      divider12:null,
    'Level of Difficulty':{
      'Beginner':null,
      'Intermediate':null,
      'Expert':null
    },divider6:null,
    Provider:{
      Alison:null,
      'Canvas Network':null,
      Coggno:null,
      Coursera:null,
      Datacamp:null,
      edX:null,
      'Future Learn':null,
      'Google Unlocked':null,
      'HarvardX':null,
      'Kadenze':null,
      'Linked Learning':null,
      'MIT OCW':null,
      'NPTEL':null,
      'Open Learning':null,
      'Plural Sight':null,
      'Skillshare':null,
      'Swayam':null,
      'The Great Courses':null,
      'Treehouse':null,
      'tuts+':null,
      'Udacity':null,
      'Udemy':null,
      'upGrad':null,
      'Yale OCW':null
    },divider7:null,
    'Course Content':{
      Audio:null,
      Video:null,
      'Text':null
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
    
  },
  divider11:null
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
  Selected45=false;
  Selected40=false;
  Selected35=false;


  constructor(private searchService:SeacrhServiceService,private messageService:MessageService,private _database: ChecklistDatabase,
    private dialog:MatDialog,private afauth:AngularFireAuth,private pfs:ProfileService,private snackBar:MatSnackBar, private activateRouter:ActivatedRoute,private spinner: NgxSpinnerService,
    private bottomsheet:MatBottomSheet) { 
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
   public searchCourseField:string="";

   private courseSubField=['History','Music and Art','Philosophy','Business Essentials','Business Strategy','Entrepreneurship','Finance','Leadership and Management',
  'Marketing','Algorithms','Computer Science and Technology','Design and Product','Mobile and Web Development','Software Development','Data Analysis',
'Machine Learning','Probability and Statistics','Animal Health','Basic Health','Health Informatics','Healthcare Management','Nutrition','Patient Care','Psychology','Research',
'Cloud Computing','Data Management','Security','Support and Operations','Learning English','Other Languages','Chemistry','Electrical Engineering','Enviromental Science and sustainability',
'Mechanical Engineering','Physics and Astronomy','Research Methods','Education','Economics','Governance and Society','Law',];
public courseSubFieldParam=[];


private programType=['Course','Degree'];
public programTypeParam=[];

private programMode=['Recorded','Live','Mixed'];
public programModeParam=[];


private difficultyLevel=['Beginner','Intermediate','Expert','Mixed'];
public difficultyLevelParam=[];

public isCertiRequired:boolean=false;

private courseprovider=[ 'Alison',
  'Canvas Network',
  'Coggno',
  'Coursera',
  'Datacamp',
  'edX',
  'Future Learn',
  'Google Unlocked',
  'HarvardX',
  'Kadenze',
  'Linked Learning',
  'MIT OCW',
  'NPTEL',
  'Open Learning',
  'Plural Sight',
  'Skillshare',
  'Swayam',
  'The Great Courses',
  'Treehouse',
  'tuts+',
  'Udacity',
  'Udemy',
  'upGrad',
  'Yale OCW'];
public courseProvideParam=[];

private contentType=['Audio','Video','Text'];
public  contentTypeParam=[];

private languages=['English','French'];
public languageParam=[];

private transcript=['English','French'];
private transcriptParam=[];


public loadingFirst=false;
public chipList=[];

  transformer = (node: TodoItemNode, level: number) => {
    const existingNode = this.nestedNodeMap.get(node);
    const flatNode = existingNode && existingNode.item === node.item
        ? existingNode
        : new TodoItemFlatNode();
    flatNode.item = node.item;
    flatNode.level = level;
    flatNode.expandable = !!node.children?.length;
   
    if(level===0 && flatNode.item!='Advanced'){
      flatNode.header = true;
      this.treeControl.expand(flatNode);
    }
    else if(flatNode.item=='Advanced'){
      flatNode.header = false;
      flatNode.advance=true;
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
      if(node.item==="Level of Difficulty" || node.item==='Provider' || node.item==="Course Content" || node.item==="Other Specifics"
      || node.item==="Language" || node.item==="Transcript"){
        flatNode.advadedHeader=true;
      }
      if(node.item==="divider" || node.item==="divider1" || node.item==="divider2"|| node.item==="divider3"
      || node.item==="divider4" || node.item==="divider5"  || node.item==="divider6" || node.item==="divider7"
      || node.item==="divider8" || node.item==="divider9" || node.item==="divider10" || node.item==="divider11"||
      node.item==="divider12"){
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
  isAdvance= (_: number, _nodeData:TodoItemFlatNode)=> _nodeData.advance;
  isAdvanceHeader= (_: number, _nodeData:TodoItemFlatNode)=> _nodeData.advadedHeader;


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
    this.setCourseParameter();
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
    var providerParam;
     this.activateRouter.queryParams.subscribe(params => {
      searchParam = params['search'];
      this.searchKey=searchParam;
      providerParam=params['provider'];
      if(providerParam!==undefined &&  this.courseProvideParam.indexOf(providerParam)>-1){
      this.courseProvideParam.push(providerParam);
      }
      this.pageNo=0;
      this.bottomindictor=false;
      this.searchFilterBased(searchParam);
    });

    
     //this.messageService.getMessage().subscribe(message => { this.searchMethod(message) });
  }
  loading =false;
  pageSize="30";
  pageNo:number=0;
  searchKey:string;
  searchMethod(parameter):void{
    if(this.pageNo===1){
     this.loadingFirst=true;
     }
     this.loading=true;
      this.searchService.getCourseByKeyWord(parameter,this.pageNo,this.pageSize).subscribe((response:any)=>{
       if(this.pageNo===1){
        this.courseList=response.content;
      this.courseListCopy= [...this.courseList];
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
      this.filterCourse('any');
  });
  }
  descendantsAllSelected(node: TodoItemFlatNode): boolean {
    if(node.parameter!=='course_field'){
 return this.checklistSelection.isSelected(node);
    }
   
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
    if(node.parameter==='course_subfield'){
    this.changeCourseSubfieldParams(...[node]);
    }
    event.checked=this.checklistSelection.isSelected(node)?true:false
    if(node.parameter!=='course_subfield' && event.checked===true){
   this.addToChipList(node);
    }
    else if(node.parameter!=='course_subfield' && event.checked===false){
      this.removeFromChipList(node);
      }
      if( event.checked){
        switch(node.parameter){
          case 'course_field':{
            this.courseFieldParam.push(node.item);
            this.searchCourseField= this.searchCourseField +" "+ node.item;
            console.log(this.searchCourseField);
            break;
          }
          case 'course_type':{
            this.programTypeParam.push(node.item);
            break;
          }
          case 'course_program':{
            this.programModeParam.push(node.item);
            break;
          }
          case 'course_diff':{
             this.difficultyLevelParam.push(node.item);
             break;
          } 
          case  'course_provider':{
            this.courseProvideParam.push(node.item);
            break;
          }
          case 'course_content' : {
              this.contentTypeParam.push(node.item);
              break;
          }
          case 'course_lang' : {
            this.languageParam.push(node.item);
            break;
          }
          case 'course_trnsc' :{
            this.transcriptParam.push(node.item);
            break;
          }
          case 'course_certi' :{
            this.isCertiRequired=true;
            break;
          }
       }
         
      }
      else if(!event.checked){
        switch(node.parameter){
          case 'course_field':{
            const index= this.courseFieldParam.indexOf(node.item);
            this.courseFieldParam.splice(index,1);
            const regex="/" + node.item +"/gi";
            this.searchCourseField= this.searchCourseField.replace(regex,"");
            console.log(this.searchCourseField);
            break;
          }
          case 'course_type':{
            const index= this.programTypeParam.indexOf(node.item);
            this.programTypeParam.splice(index,1);
            break;
          }
          case 'course_program':{
            const index= this.programModeParam.indexOf(node.item);
            this.programModeParam.splice(index,1);
            break;
          }
          case 'course_diff':{
            const index= this.difficultyLevelParam.indexOf(node.item);
            this.difficultyLevelParam.splice(index,1);
            break;
          }
          case 'course_provider' :{
            const index= this.courseProvideParam.indexOf(node.item);
            this.courseProvideParam.splice(index,1);
            break;
          }
          case 'course_content' :{
            const index= this.contentTypeParam.indexOf(node.item);
            this.contentTypeParam.splice(index,1);
            break;
          }
          case 'course_lang' :{
            const index= this.languageParam.indexOf(node.item);
            this.languageParam.splice(index,1);
            break;
          }
          case 'course_trnsc' :{
            const index= this.transcriptParam.indexOf(node.item);
            this.transcriptParam.splice(index,1);
            break;
          }
          case 'course_certi' :{
            this.isCertiRequired=false;
            break;
          }
      }
      this.pageNo=0;
      this.searchFilterBased(this.searchKey);
  }
     
    //   }
    this.pageNo=0;
    this.searchFilterBased(this.searchKey);
  }
  descendantsPartiallySelected(node: TodoItemFlatNode): boolean {
    if(node.parameter!=='course_field')
     return false;
    const descendants = this.treeControl.getDescendants(node);
    const result = descendants.some(child => this.checklistSelection.isSelected(child));
    return result && !this.descendantsAllSelected(node);
  }
  
  todoItemSelectionToggle(node: TodoItemFlatNode,event): void {
    if(node.level===2 || node.parameter!=='course_field'){
      this.todoLeafItemSelectionToggle(node,event);
      return ;
    }else{
    this.checklistSelection.toggle(node);
    const descendants = this.treeControl.getDescendants(node);
    this.checklistSelection.isSelected(node)
      ? this.checklistSelection.select(...descendants)
      : this.checklistSelection.deselect(...descendants);
      this.checklistSelection.isSelected(node)
      ? event.checked=true
      : event.checked=false;
    // Force update for the parent
    this.changeCourseSubfieldParams(...descendants);
    descendants.forEach((child) => {
      this.checklistSelection.isSelected(child)
    });
    this.checkAllParentsSelection(node);
    console.log(node,event);
    if( event.checked){
      switch(node.parameter){
        case 'course_field':{
          this.courseFieldParam.push(node.item);
          this.searchCourseField= this.searchCourseField +" "+ node.item;
          console.log(this.searchCourseField);
          break;
        }
      }
        
    if(this.chipList.length===0 || this.chipList.indexOf(node)<0){
    this.chipList.push(node);
    }
    }
    else if(!event.checked){
      switch(node.parameter){
        case 'course_field':{
          const index= this.courseFieldParam.indexOf(node.item);
          this.courseFieldParam.splice(index,1);
          const regex="/" + node.item +"/gi";
          this.searchCourseField= this.searchCourseField.replace(regex,"");
          console.log(this.searchCourseField);
          break;
        }
    }
    const index1= this.chipList.indexOf(node);
    if(index1 !== -1){
    this.chipList.splice(index1,1);
    }
  }
  } 
    this.pageNo=0;  
    this.searchFilterBased(this.searchKey);
  }

  checkAllParentsSelection(node: TodoItemFlatNode): void {
    let parent: TodoItemFlatNode | null = this.getParentNode(node);
    while (parent && parent.level!==0) {
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
      this.removeFromChipList(node);
      console.log('node deselect');
    } else if (!nodeSelected && descAllSelected) {
      this.checklistSelection.select(node);
      this.addToChipList(node);
      this.nodeValueMap.set(node,false);
    }
    this.setChildChipList(node,...descendants);
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
        this.bookMarkobject.courseid= course.course_id;
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
       this.bottomsheet.open(BottomSheetComponent,{
         data:'Account verification email has been sent to your email ID'
       });
        this.userData.sendEmailVerification().then(result=>{
          course.bookmarked=!course.bookmarked;
         
        },
        err=>{
               console.log('not verified')
        })
      }
       }
       else{
        const dialogRef = this.dialog.open(LoginComponent,{
          maxHeight:'520px',
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

     Selected45=false;
  Selected40=false;
  Selected35=false;
     clicked45(){
       if(this.Selected40)
       {
         this.Selected40=!this.Selected40;
       }
       if(this.Selected35)
       {
         this.Selected35=!this.Selected35;
       }
      this.Selected45=!this.Selected45;
     this.filterCourse('any');
     
   }
   clicked40(){
    if(this.Selected45)
    {
      this.Selected45=!this.Selected45;
    }
    if(this.Selected35)
    {
      this.Selected35=!this.Selected35;
    }
   this.Selected40=!this.Selected40;
   this.filterCourse('any');

}
clicked35(){
  if(this.Selected45)
  {
    this.Selected45=!this.Selected45;
  }
  if(this.Selected40)
  {
    this.Selected40=!this.Selected40;
  }
 this.Selected35=!this.Selected35;
 this.filterCourse('any');

}
   filterCourse(params){
     this.courseList=  [...this.courseListCopy];

      // this.courseList= this.courseList.filter(course=>{

      //  return this.doCourseFieldFilter(course) && this.doProgramTypeFilter(course) && this.doCourseSubFieldFilter(course) &&
      //   this.doContentTypeFilter(course) && this.doLanguageFilter(course) && this.doTranscriptFilter(course) &&
      //   this.doDifficultyFilter(course) && this.doProviderFilter(course) && this.doTranscriptFilter(course) &&
      //   this.doContentTypeFilter(course) && this.doRateFilter(course);
      // });
      console.log(this.courseList);
   } 
   doCourseFieldFilter(){
      var result=""
      for(var i=0;i<this.courseFieldParam.length;i++){
       result= result + " " + this.courseFieldParam[i];
         }
         return result;
   } 
   doCourseSubFieldFilter(){
    var result=""
        for(var i=0;i<this.courseSubFieldParam.length;i++){
      result= result +" " +this.courseSubFieldParam[i];
        }
        return result;
  } 

  doProgramTypeFilter(){
 
    var result=""
        for(var i=0;i<this.programTypeParam.length;i++){
      result= result + " "+ this.programTypeParam[i];
        }
      
        return result;
  } 
  doProgramModeFilter(){
 
    var result=""
        for(var i=0;i<this.programModeParam.length;i++){
      result= result + " "+ this.programModeParam[i];
        }
        return result;
  }  
  doLanguageFilter(){
       var result="";
        for(var i=0;i<this.languageParam.length;i++){
      result= result + " " +this.languageParam[i];
        }
        return result;
  }
  doTranscriptFilter(){
  
    var result=""
        for(var i=0;i<this.transcriptParam.length;i++){
      result= result + this.transcriptParam[i];
        }
        return result;
  }
  doDifficultyFilter(){
   
    var result="";
        for(var i=0;i<this.difficultyLevelParam.length;i++){
      result= result + this.difficultyLevelParam[i];
        }
        return result;
  } 
  doProviderFilter(){
   
    var result="";
        for(var i=0;i<this.courseProvideParam.length;i++){
      result= result +" " + this.courseProvideParam[i];
        }
        return result;
  } 
  doContentTypeFilter(){
   
    var result= "";
        for(var i=0;i<this.contentTypeParam.length;i++){
      result= result+ " "+ this.contentTypeParam[i];
        }
        return result;
  }
  doRateFilter(course){
    if(this.Selected45 && parseFloat(course.course_rating)>4.5){
       return true;
    } 
    else if(this.Selected40 && parseFloat(course.course_rating)>4.0){
      return true;
   }
   else if(this.Selected35 && parseFloat(course.course_rating)>3.5){
    return true;
 }
 else if(!this.Selected35 && !this.Selected40 && !this.Selected45){
   return true;}
   else return false;
  }
  

  onScroll(){
    this.spinner.show();
    if(this.loading===true){
      return;
    }
    else{
      
      this.searchFilterBased(this.searchKey);
      console.log('start searching');
     }
  }
 
  changeCourseSubfieldParams(...value:TodoItemFlatNode[]){
    for(var index=0;index<value.length;index++ ){
      if(this.checklistSelection.isSelected(value[index]) && this.courseSubFieldParam.indexOf(value[index].item)<0){
           this.courseSubFieldParam.push(value[index].item);
      }
      else if(!this.checklistSelection.isSelected(value[index]) && this.courseSubFieldParam.indexOf(value[index].item)>-1){
              this.courseSubFieldParam.splice(this.courseSubFieldParam.indexOf(value[index].item),1);
      }
    }
  }
  
  removeFromChipList(param:TodoItemFlatNode){
    if(param.level===0)
     return ;
    var index= this.chipList.indexOf(param);
    if(index>-1){
      this.chipList.splice(index,1);
    }
  }
  addToChipList(param:TodoItemFlatNode){
    if(param.level===0)
     return ;
    var index= this.chipList.indexOf(param);
    if(index<0){
      this.chipList.push(param);
    }
  }

  setChildChipList(parent:TodoItemFlatNode,...values:TodoItemFlatNode[]){
    if(parent.level===0)
     return;
    if(this.checklistSelection.isSelected(parent)){
      for(var index=0;index<values.length;index++){
        this.removeFromChipList(values[index]);
      }
    }
    else{
      for(var index=0;index<values.length;index++){
        if(this.checklistSelection.isSelected(values[index])){
        this.addToChipList(values[index]);}
        else{
          this.removeFromChipList(values[index]);
        }
      }
    }
  }
  setCourseParameter(){
    for(var i=0;i<this.treeControl.dataNodes.length;i++){
      var flatNode = this.treeControl.dataNodes[i];
      var courseIndex=this.courseField.indexOf(flatNode.item);
      var courseSubFieldIndex= this.courseSubField.indexOf(flatNode.item);
      if(courseIndex!=-1){
           flatNode.parameter='course_field';
          }
      else if(courseSubFieldIndex!==-1){
       flatNode.parameter='course_subfield';
      }
      else if(this.programMode.indexOf(flatNode.item)!==-1){
           flatNode.parameter='course_program';
      }
      else if(this.difficultyLevel.indexOf(flatNode.item)!==-1){
        flatNode.parameter='course_diff';
   }
    else if(this.courseprovider.indexOf(flatNode.item)!==-1){
    flatNode.parameter='course_provider';
  }
  else if(this.contentType.indexOf(flatNode.item)!==-1){
    flatNode.parameter='course_content';
  }
   else if(this.programType.indexOf(flatNode.item)!==-1){
       flatNode.parameter="course_type"
      }
      else if(flatNode.item==='Certification'){
        flatNode.parameter="course_certi"
      }
      else if(flatNode.level===1){
      let parent=this.getParentNode(flatNode);
      if(parent && parent.item==='Language'){
        flatNode.parameter='course_lang'
      }
      else if(parent && parent.item==='Transcript'){
        flatNode.parameter='course_trnsc'
      }
     
    // parent.item==='Language'?flatNode.parameter='course_lang':flatNode.parameter='course_trnsc';
   }
    }
  }
  onSliderScroll(event){
     console.log(this.minDuration,this.minValue,this.maxDuration,this.maxValue);
  }
  bottomindictor:boolean=false;
  searchFilterBased(parameter){
      var courseBody= {
        course_field:'*',
        course_subfield:'*',
        course_content:'*',
        course_diff:'*',
        course_type:'*',
        course_lang:'*',
        course_program:'*',
        course_provider:'*',
        course_trnsc:'*',
        course_search:parameter,
        course_certi:'*'
      };
      if(this.courseFieldParam.length!==0){
        courseBody.course_field=this.doCourseFieldFilter()

      }
      else{
        delete courseBody.course_field;
      }
      if(this.courseSubFieldParam.length!==0){
        courseBody.course_subfield=this.doCourseSubFieldFilter();
      }
      else{
        delete courseBody.course_subfield;
      }
      if(this.contentTypeParam.length!==0){
        courseBody.course_content=this.doContentTypeFilter();
      }
      else{
        delete courseBody.course_content;
      }
      if(this.difficultyLevelParam.length!==0){
        courseBody.course_diff=this.doDifficultyFilter();
      } else{
        delete courseBody.course_diff;
      }
      if(this.languageParam.length!==0){
        courseBody.course_lang=this.doLanguageFilter();
      }else{
        delete courseBody.course_lang;
      }
      if(this.programModeParam.length!==0){
        courseBody.course_program=this.doProgramModeFilter();
      }
      else{
        delete courseBody.course_program;
      }
      if(this.programTypeParam.length!==0){
        courseBody.course_type=this.doProgramTypeFilter();
      }
      else{
        delete courseBody.course_type;
      }
      if(this.courseProvideParam.length!==0){
        courseBody.course_provider=this.doProviderFilter();
      }else{
        delete courseBody.course_provider;
      }
      if(this.transcriptParam.length!==0){
        courseBody.course_trnsc=this.doTranscriptFilter();
      }
      else{
        delete courseBody.course_trnsc;
      }
      if(parameter==='*'){
        delete courseBody.course_search;
      }
      if(this.isCertiRequired){
        courseBody.course_certi='Availabe';
      }
      else{
        delete courseBody.course_certi;
      }
      if(this.pageNo===0){
        this.loadingFirst=true;
        this.courseList=[];
        }
     
        this.loading=true;
        this.bottomindictor=false;
         this.searchService.getFilteredCourses(courseBody,this.pageNo,this.pageSize).subscribe((response:any)=>{
          if(this.pageNo===0){
           this.courseList=response.content;
         this.courseListCopy= [...this.courseList];
         this.loadingFirst= false;
          }
          else{
            this.courseList= this.courseList.concat(response.content);
            this.courseListCopy= this.courseListCopy.concat(response.content);
            this.loadingFirst= false;
          }
        this.totalResults=response.totalElements;
         this.loading=false;
         this.pageNo= this.pageNo+1;
         if(this.pageNo===response.totalPages){
           this.bottomindictor=true;
         }
        });
  }

}
