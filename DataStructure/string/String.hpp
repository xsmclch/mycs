#include<string>

class String
{
public:
    String(const char* newString);
    ~String(){};
    char& operator[](int offset);
    std::string x;
    constexpr int getSize(){return size;}
private:
    int size;
};

String::String(const char* newString):x(newString)
{
    this->size = x.size();
}

char& String::operator[](int offset)
{
    if(offset > x.size())
        return x[x.size() - 1];
    else if(offset == 0 || offset < 0)
        return x[0];
    else
        return x[offset - 1];
}