import { Component, OnInit } from '@angular/core';
import { Halls } from '../Shared/Hall';
import { Pipe, PipeTransform } from '@angular/core';
import { Router } from '@angular/router';

@Pipe({
    name: 'listFilter',
    pure: false
})
export class CustomPipe implements PipeTransform {
    transform(items: Halls, location: string): any {
        if (!items) return [];
        if (!location) return items;
      //  if (items || !location) return items;
        console.log("gotten just before filter");
        console.log("location in filter is " + location);

        console.log("final from filter " + items.Locations.toString());
        return items.Locations.toLocaleLowerCase().indexOf(location) !== -1;
    } 
}