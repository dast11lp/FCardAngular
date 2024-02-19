import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BankAccounttService } from '../../services/bankAccountt/bank-accountt.service';

@Component({
  selector: 'app-bank-accountt',
  standalone: true,
  imports: [],
  templateUrl: './bank-accountt.component.html',
  styleUrl: './bank-accountt.component.css'
})
export class BankAccounttComponent implements OnInit {

  paramId!: string | null;
  bankaccount: any;

  constructor (
    private activatedRoute: ActivatedRoute,
    private bankService: BankAccounttService
    ) 
  {}

  ngOnInit(): void {
    this.paramId = this.activatedRoute.snapshot.paramMap.get('id');
    this.getBankAccount();
  }

  getBankAccount (): void {
    this.bankService.getBankAccount(this.paramId).subscribe({
      next: data => {this.bankaccount = data, console.log(this.bankaccount);
      }
    })
  }
}
