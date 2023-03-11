export {}

declare global {
    interface String {
      isNullOrEmptyOrUndefined(): boolean;
    }
  }
  
  String.prototype.isNullOrEmptyOrUndefined = function() {
    return this == null || this == "" || this == undefined;
  };