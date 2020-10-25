#include <emscripten.h>
#include "evaluate.cpp"

extern "C"
{
  EMSCRIPTEN_KEEPALIVE
  double evaluate(char *name)
  {
    std::string str(name);
    OPN param(str);

    return param.Calculate();
  }
}
