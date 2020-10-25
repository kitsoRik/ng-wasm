#include <string>
#include <map>
#include <stack>
#include <cmath>
#include <cctype>
#include <cassert>
#include <algorithm>
#include <vector>
#include <functional>
#include <emscripten.h>
#include <emscripten/bind.h >

using namespace emscripten;

struct Record
{
  std::string firstName;
  std::string lastName;
  int age;
};

extern "C"
{
  Record createRecord(const std::string &firstName, const std::string &lastName, const int &age)
  {
    Record record;

    record.firstName = firstName;
    record.lastName = lastName;
    record.age = age;

    return record;
  }

  EMSCRIPTEN_BINDINGS(my_class_example)
  {
    value_object<Record>("MyClass")
        .field("firstName", &Record::firstName)
        .field("lastName", &Record::lastName)
        .field("age", &Record::age);

    function("createRecord", &createRecord);
  }
}
