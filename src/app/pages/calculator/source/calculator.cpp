#include <string>
#include <map>
#include <stack>
#include <cmath>
#include <cctype>
#include <cassert>
#include <algorithm>
#include <vector>
#include <functional>

class OPN
{
	std::vector<std::string> functions;
	std::map<char, char> prior;
	std::string str;

public:
	OPN(std::string &str) : str(str)
	{
		prior = {
			{'+', 1},
			{'-', 1},
			{'*', 2},
			{'/', 2},
			{'%', 2},
			{'^', 3},
			{-'!', 3},
			{-'+', 4},
			{-'-', 4}};

		functions = {"sin", "cos", "tan"};
	}

	~OPN()
	{
	}

	double Calculate()
	{
		std::stack<char> op;
		std::stack<double> st;
		if (!areParenthesesGood(str))
		{
			// std::cout << "Input error!";
			return EXIT_FAILURE;
		}
		else if (!isGoodCharacters(str))
		{
			// std::cout << "Input error!";
			return EXIT_FAILURE;
		}
		replaceStringtoNumb(str);
		str.erase(std::remove(str.begin(), str.end(), ' '), str.end());
		for (std::size_t i = 0; i < str.length(); ++i)
		{
			if (str[i] == '(')
			{
				op.push(str[i]);
			}
			else if (str[i] == ')')
			{
				while (op.top() != '(')
				{
					ProcessOperation(st, op.top());
					op.pop();
				}
				op.pop();
			}
			else if (isOperation(str[i]))
			{
				char curOper = str[i];
				if ((str[i] == '+' || str[i] == '-') && (i == 0 || (!std::isdigit(str[i - 1]) && str[i - 1] != '.' && str[i - 1] != ')' && str[i - 1] != '!')))
					curOper = -curOper;
				else if (str[i] == '!' && (std::isdigit(str[i - 1]) || str[i - 1] == ')'))
					curOper = -curOper;
				while (!op.empty() && prior[op.top()] >= prior[curOper])
				{
					ProcessOperation(st, op.top());
					op.pop();
				}
				op.push(curOper);
			}
			else
			{
				std::string operand;
				while (i < str.length() && (std::isdigit(str[i]) || str[i] == '.'))
					operand += str[i++];
				--i;
				st.push(std::stod(operand));
			}
		}
		while (!op.empty())
		{
			ProcessOperation(st, op.top());
			op.pop();
		}
		return st.top();
	}

private:
	void replaceStringtoNumb(std::string &str)
	{
		for (auto &s : functions)
		{
			std::string::size_type pos = 0;
			while ((pos = str.find(s, pos)) != std::string::npos)
			{
				std::string::size_type beg = str.find('(', pos);
				std::string::size_type end = str.find(')', beg);
				double tmp = std::stod(str.substr(beg + 1, end - beg - 1));

				if (s == "sin")
					str.replace(pos, end - pos + 1, std::to_string(std::sin(tmp)));
				else if (s == "cos")
					str.replace(pos, end - pos + 1, std::to_string(std::cos(tmp)));
				else
					str.replace(pos, end - pos + 1, std::to_string(std::tan(tmp)));

				pos = end;
			}
		}
	}

	inline bool isOperation(char ch)
	{
		return ch == '+' || ch == '-' || ch == '*' || ch == '/' || ch == '^' || ch == '!';
	}

	inline bool isGoodCharacters(std::string &str)
	{
		return std::all_of(str.begin(), str.end(), [](char ch) {
			return std::isalnum(ch) || std::isspace(ch) || ((ch >= 40 && ch < 44) || (ch > 44 && ch <= 47)) || ch == 33 || ch == 94;
		});
	}

	inline bool areParenthesesGood(std::string &str)
	{
		int brackets = 0;
		for (auto ch : str)
		{
			brackets += (ch == '(');
			brackets -= (ch == ')');
			if (brackets < 0)
				return false;
		}

		return brackets == 0;
	}

	void ProcessOperation(std::stack<double> &st, char oper)
	{
		if (oper < 0)
		{
			double arg = st.top();
			st.pop();

			switch (-oper)
			{
			case '+':
				st.push(arg);
				break;
			case '-':
				st.push(-arg);
				break;
			case '!':
				st.push(fact(arg));
				break;

			default:
				assert(!"invalid unary operation");
				break;
			}
		}
		else
		{
			double arg1 = st.top();
			st.pop();
			double arg2 = st.top();
			st.pop();

			switch (oper)
			{
			case '+':
				st.push(arg2 + arg1);
				break;
			case '-':
				st.push(arg2 - arg1);
				break;
			case '*':
				st.push(arg2 * arg1);
				break;
			case '/':
				st.push(arg2 / arg1);
				break;
			case '%':
				st.push(std::fmod(arg2, arg1));
				break;
			case '^':
				st.push(std::pow(arg2, arg1));
				break;

			default:
				assert(!"invalid binary operation");
				break;
			}
		}
	}

	double fact(double val)
	{
		if (val == 0)
			return 1;
		return val * fact(val - 1);
	}
};
#include <emscripten.h>

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