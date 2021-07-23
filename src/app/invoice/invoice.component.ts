import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import * as $ from 'jquery';
import {HttpClient} from '@angular/common/http';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import cities from '../../assets/usa-cities.json';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {
  name = '';
  @ViewChild('content', {static: false}) content: ElementRef;
  private url = 'http://localhost:3000/cities';
  products: any = [];
  filterone: any = [];
  movies: Array<String> = [];
  moviesTable: Array<String> = [];
  fuels: Array<String> = [];
  fuelTable: Array<String> = [];
  keyword = 'name';
  finalFreightSum = 0;
  totalFuelSum = 0;
  insuranceAmount = 0;
  accessoriesAmount = 0;

  modelablcok: any = [""];
  modelabl: any = [""];
  modelablfuel: any = [""];
  grandtotal: any;
  model: any;
  locations: any = [];
  private isButtonVisible = true;

  selectEvent(item: string) {

  }

  onChangeSearch(val: string) {

  }

  onFocused(e: string) {

  }

  constructor(private httpClient: HttpClient) {
  }

  ngOnInit() {

    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    });
    this.locations = ["South Creek, WA", "Roslyn, WA", "Sprague, WA", "Gig Harbor"];
    $(document).ready(() => {
      $('#myTable').on('input', '.txtCal', function() {
        let calculatedTotalSum = 0;
        $('#myTable .txtCal').each(function() {
          const getTextboxValue = $(this).val();
          if ($.isNumeric(getTextboxValue)) {
            calculatedTotalSum += parseFloat(getTextboxValue);
          }
        });

        $('#total_sum_value').html(formatter.format(calculatedTotalSum));
        const main = calculatedTotalSum;
        const disc = 10;
        const dec = (disc / 100); // its convert 10 into 0.10
        const mult = main * dec;
        $('#result').html(formatter.format(mult));

        const finalamount = calculatedTotalSum;
        this.finalFreightSum = finalamount - mult;
        $('#duetotal').html(formatter.format(this.finalFreightSum));
        const $this = $(this);

        $('#adjusttotal').click();
        $('#fueltotal').click();
        $('#duetotal').click();
      });

      $('#AddjectTable').on('input', '.qty1', () => {
        let sum = 0;
        $('.qty1').each(function() {
          sum += +$(this).val();
        });
        $('#adjusttotal').click();
        $('#fueltotal').click();
        $('#duetotal').click();
      });

      $(document).ready(() => {
        $('#fuelTable').on('input', '.fuelCal', function() {
          let fuelTotal = 0;
          $('#fuelTable .fuelCal').each(function() {
            const getFuelVal = $(this).val();
            if ($.isNumeric(getFuelVal)) {
              fuelTotal += parseFloat(getFuelVal);
            }
          });

          this.totalFuelSum = fuelTotal;
          $('#fueltotal').html(formatter.format(fuelTotal));
          $('#adjusttotal').click();
          $('#fueltotal').click();
          $('#duetotal').click();
        });
      });
    });

    $(document).ready(() => {
      $('.main').on('click', '.grandtotal', () => {
        let grandTotal = 0;
        $('.main .grandtotal').each(function() {
          const getGrandTotalValue = $(this).val();
          if ($.isNumeric(getGrandTotalValue)) {
            grandTotal += parseFloat(getGrandTotalValue);
            console.log('grand_total', grandTotal);
          }
        });
        $('#garnd_total').html(grandTotal);

      });
    });

    this.products = cities;

    /*    this.httpClient.get(this.url).subscribe(data => {
          console.log(data);
          this.products = data;

        });*/


  }

  searchblock = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term === '' ? []
        : this.products.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 15)),
    )
  formatters = (x) => x;

  onBlcokSelectItem($event, input): void {
    event.preventDefault();
    const viewlist = $event;
    input.value = '';
  }

  trackByIndex(index: number, obj: any): any {
    return index;
  }

  addElement() {
    this.movies.push('Element ' + (this.movies.length + 1));
  }

  addFuel() {
    this.fuels.push('Element ' + (this.fuels.length + 1));
  }

  ionViewDidLoad() {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    });

    $('input').css('border', 'none');
    $('.export_btn').css('display', 'none');
    $('.add_btn').css('display', 'none');
    $('.add_fuel_btn').css('display', 'none');


    let totalDue = $('#duetotal')[0].innerHTML;
    totalDue = totalDue.replace(',', '');
    totalDue = parseFloat(totalDue.substring(1));

    let totalFuel = $('#fueltotal')[0].innerHTML;
    totalFuel = totalFuel.replace(',', '');
    totalFuel = parseFloat(totalFuel.substring(1));

    const grandTotal = totalDue - totalFuel;
    $('#grandtotal').html(formatter.format(grandTotal));

    setTimeout(() => {
      this.exporttopdf();
    }, 1000);
  }

  exporttopdf() {

    window.print();


    $('.export_btn').css('display', 'block');
    $('.add_btn').css('display', 'block');
    $('.add_fuel_btn').css('display', 'block');
  }

}
