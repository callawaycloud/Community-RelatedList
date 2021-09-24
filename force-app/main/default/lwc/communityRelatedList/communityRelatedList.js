import { LightningElement, api } from "lwc";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import getRelatedRecords from "@salesforce/apex/CommunityRelatedListHelper.getRelatedRecords";

export default class CommunityRelatedList extends LightningElement {
    @api recordId;
    @api objectApiName;
    @api lookupApiName;
    @api cardTitle;
    @api cardIcon;
    @api column1FieldApiName;
    @api column1Label;
    @api column2FieldApiName;
    @api column2Label;
    @api column3FieldApiName;
    @api column3Label;
    @api column4FieldApiName;
    @api column4Label;
    @api column5FieldApiName;
    @api column5Label;

    relatedRecords = [];
    defaultSortDirection = "desc";
    sortDirection = "desc";

    connectedCallback() {
        let fields = [
            this.column1FieldApiName,
            this.column2FieldApiName,
            this.column3FieldApiName,
            this.column4FieldApiName,
            this.column5FieldApiName
        ];

        // Remove null indexes
        let temp = [];
        for (let columnApiName of fields) {
            if (columnApiName) {
                temp.push(columnApiName);
            }
        }
        fields = temp;

        getRelatedRecords({
            recordId: this.recordId,
            objectApiName: this.objectApiName,
            lookupApiName: this.lookupApiName,
            fieldApiNames: fields
        })
            .then((relatedRecords) => {
                this.relatedRecords = relatedRecords;
            })
            .catch((error) => {
                this.displayToast("Error", this.getWireError(error), "error");
            });
    }

    get getColumns() {
        let columns = [
            {
                label: this.column1Label,
                fieldName: this.column1FieldApiName,
                sortable: true,
                hideDefaultActions: true
            }
        ];

        this.checkColumn(columns, this.column2Label, this.column2FieldApiName);
        this.checkColumn(columns, this.column3Label, this.column3FieldApiName);
        this.checkColumn(columns, this.column4Label, this.column4FieldApiName);
        this.checkColumn(columns, this.column5Label, this.column5FieldApiName);
        return columns;
    }

    checkColumn(columns, columnLabel, columnApiName) {
        if (columnLabel && columnApiName) {
            columns.push({
                label: columnLabel,
                fieldName: columnApiName,
                sortable: true,
                hideDefaultActions: true
            });
        }
    }

    // Make this dynamically know the first sortable column
    get getSortedBy() {
        return this.column1FieldApiName;
    }

    onHandleSort(event) {
        const { fieldName: sortedBy, sortDirection } = event.detail;
        const cloneData = [...this.files];

        cloneData.sort(this.sortBy(sortedBy, sortDirection === "asc" ? 1 : -1));
        this.files = cloneData;
        this.sortDirection = sortDirection;
        this.sortedBy = sortedBy;
    }

    sortBy(field, reverse, primer) {
        const key = primer
            ? function (x) {
                  return primer(x[field]);
              }
            : function (x) {
                  return x[field];
              };

        return function (a, b) {
            a = key(a);
            b = key(b);

            if (typeof a === "string") {
                a = a.toLowerCase();
                b = b.toLowerCase();
            }

            return reverse * ((a > b) - (b > a));
        };
    }

    getWireError(error) {
        console.error(error);

        let message = "Unknown error";
        if (Array.isArray(error.body)) {
            message = error.body.map((e) => e.message).join(", ");
        } else if (typeof error.body.message === "string") {
            message = error.body.message;
        }
        return message;
    }

    displayToast(title, message, variant) {
        this.dispatchEvent(
            new ShowToastEvent({
                title: title,
                message: message,
                variant: variant
            })
        );
    }
}
